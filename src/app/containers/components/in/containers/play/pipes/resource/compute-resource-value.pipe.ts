import {
  Pipe,
  PipeTransform
} from "@angular/core";
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
            break;
          }

          case 'plot': {
            break;
          }
        }
        
        break;
      }
    }

    return resources[type].toString();
  }
}