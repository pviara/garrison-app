import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { environment } from 'src/environments/environment';
import {
  GarrisonBuilding,
  GarrisonResearch,
  GarrisonResources,
  GarrisonUnit
} from 'src/models/dynamic/IGarrison';
import { ResourceType } from "src/models/dynamic/ResourceType";
import { IBuilding } from 'src/models/static/IBuilding';
import { IUnit } from 'src/models/static/IUnit';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_resource_value'
})
export class ComputeResourceValuePipe implements PipeTransform {
  transform(
    type: ResourceType,
    resources: GarrisonResources,
    staticBuildings: IBuilding[],
    staticUnits: IUnit[],
    dynamicBuildings: GarrisonBuilding[],
    dynamicResearches: GarrisonResearch[],
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    // use the right computation for the right resource
    const lastUpdateKey = `${type}LastUpdate`;
    switch (lastUpdateKey) {

      case 'goldLastUpdate':
      case 'woodLastUpdate': {
        if (!resources[lastUpdateKey]) break;
       
        const staticBuilding = staticBuildings
          .find(building =>
            building.harvest?.resource === type
          );
        if (!staticBuilding || !staticBuilding.harvest) {
          throw new Error(
            'Missing harvest building in static list OR missing its characteristics.'
          );
        }

        const dynamicHarvestBuildings = dynamicBuildings
          .filter(
            building => building.code === staticBuilding.code
          );
        if (dynamicHarvestBuildings.length === 0) {
          return resources[type].toString();
        }

        // compute bonus to apply according to garrison applied researches
        let bonus = 0;
        const matchingResearch = dynamicResearches
          .find(
            research => research.code === 'improved-harvest'
          );
        if (matchingResearch) {
          bonus = _h
            .computeResearchCurrentLevel(
              now,
              matchingResearch.projects
            );
        }
        
        const elapsedMinutes = _h
          .computeElapsedMinutes(
            new Date(resources[lastUpdateKey] as Date),
            now
          );
        
        const harvestCode = lastUpdateKey === 'goldLastUpdate'
          ? 'goldmine'
          : 'sawmill';
        const profitLimit = _h
          .computeGlobalProfitLimit(
            now,
            harvestCode,
            dynamicBuildings
          );
        
        let total = resources[type];
        for (const harvestBuilding of dynamicHarvestBuildings) {
          const assignedWorkers = dynamicUnits
            .find(unit => unit.code === 'peasant')
            ?.state
            .assignments
            .find(
              assignment => assignment.type === 'harvest'
              && assignment.buildingId === harvestBuilding._id
            )
            ?.quantity || 0;
          if (assignedWorkers === 0) {
            continue;
          }

          let earned = Math.floor(
            (staticBuilding.harvest.amount + bonus)
            * elapsedMinutes
            * assignedWorkers
          );
          if ((total + earned) > profitLimit) {
            total = profitLimit - earned;
          }

          total += earned;
        }

        // just little bit of very dirty security
        if (total < resources[type]) total = resources[type];

        const floored = Math.floor(total);
        return floored > 0
          ? floored.toString()
          : (0).toString();
      }

      default: {
        switch (type) {
          
          case 'food': {

            const farms = dynamicBuildings
              .filter(
                building => building.code === 'farm'
              );
            if (!farms) break;

            const staticBuilding = staticBuildings
              .find(
                building => building.code === 'farm'
              );
            if (!staticBuilding || !staticBuilding.harvest) {
              throw new Error(
                'Missing harvest building in static list OR missing its characteristics.'
              );
            }
            
            let totalFood = 3;
            for (const farm of farms) {
              const currentLevel = _h
                .computeBuildingCurrentLevel(
                  now,
                  'extension',
                  farm.constructions
                );
              
              let factor = 0;
              if (currentLevel === 0) factor = 1;
              else if (currentLevel > 0) {
                factor = Math.pow(
                  environment.decreasedFactor,
                  currentLevel
                );
              }

              totalFood += staticBuilding?.harvest.amount * factor;
            }

            let inComing = 0;
            for (const farm of farms) {
              const unfinishedBusiness = farm
                .constructions
                .find(
                  construction => !_h.hasPast(
                    construction.endDate,
                    now
                  )
                );
              if (!unfinishedBusiness) continue;
              
              let factor = 1;
              const { improvement } = unfinishedBusiness;
              if (improvement) {
                factor = Math.pow(
                  1.2,
                  improvement.level
                );
              }

              inComing += Math.floor(staticBuilding.harvest.amount * factor);
            }

            for (const unit of dynamicUnits) {
              const staticUnit = staticUnits
                .find(
                  unit => unit.code === unit.code
                );
              if (!staticUnit) continue;

              const { food: cost } = staticUnit
                .instantiation
                .cost;
              
              totalFood -= unit.quantity * cost;
            }

            return {
              available: totalFood.toString(),
              inComing: Math.floor(inComing).toString()
            };
          }

          case 'plot': {

            let totalPlots = 60;

            for (const dynamicBuilding of dynamicBuildings) {
              const staticBuilding = staticBuildings
                .find(
                  sBuilding => sBuilding.code === dynamicBuilding.code
                );
              if (!staticBuilding) {
                throw new Error(
                  'Missing harvest building in static list OR missing its characteristics.'
                );
              }

              let improvementType: 'upgrade' | 'extension' | null = null;
              if (staticBuilding.upgrades && staticBuilding.upgrades.length > 0) {
                improvementType = 'upgrade';
              }
              else if (staticBuilding.extension) {
                improvementType = 'extension';
              }
                
              if (!improvementType) {
                totalPlots -= staticBuilding.instantiation.cost.plot;
                continue;
              }

              const currentLevel = _h
                .computeBuildingCurrentLevel(
                  now,
                  improvementType,
                  dynamicBuilding.constructions
                );
              
              for (let i = 0; i < currentLevel + 1; i++) {
                const plotCost = Math.pow(
                  1.2,
                  currentLevel
                ) * staticBuilding.instantiation.cost.plot;
                totalPlots -= Math.floor(plotCost);
              }
            }
            return Math.floor(totalPlots).toString();
          }
        }
        break;
      }
    }

    return resources[type].toString();
  }
}