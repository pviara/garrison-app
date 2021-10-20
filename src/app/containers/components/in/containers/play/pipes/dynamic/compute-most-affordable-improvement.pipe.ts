import {
  BuildingImprovementType,
  IBuilding,
  IInstantiableBuilding
} from "src/models/static/IBuilding";
import { GarrisonBuilding } from "src/models/dynamic/IGarrison";
import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { StaticHelper as _h } from "../../../../utils/helper";

@Pipe({
  name: 'compute_most_affordable_improvement'
})
export class ComputeMostAffordableImprovementPipe implements PipeTransform {
  transform(
    code: string,
    staticBuilding: IBuilding,
    dynamicBuildings: GarrisonBuilding[],
    now: Date
  ) {
    const improvableBuildings = [] as {
      building: GarrisonBuilding;
      nextLevel: number;
      cost: {
        gold: number;
        wood: number;
        plot: number;
      };
      workforce: {
        min: number;
        max: number;
      };
      improvementType: BuildingImprovementType
    }[];

    const filteredBuildings = dynamicBuildings
      .filter(building => building.code === code);

    for (const building of filteredBuildings) {
      const available = _h
        .checkBuildingAvailability(
          now,
          building
        );
      if (!available) continue;

      let improvementType: BuildingImprovementType | null = null;
      let nextLevel;
      let cost: typeof improvableBuildings[any]['cost'];

      if (
        staticBuilding.upgrades
        && staticBuilding.upgrades.length > 0
      ) {
        improvementType = 'upgrade';

        const currentLevel = _h
          .computeBuildingCurrentLevel(
            now,
            improvementType,
            building.constructions
          );

        nextLevel = staticBuilding
          .upgrades
          .find(
            upgrade => upgrade.level === currentLevel + 1
          )?.level;
      } else if (staticBuilding.extension) {
        improvementType = 'extension';

        const currentLevel = _h
          .computeBuildingCurrentLevel(
            now,
            improvementType,
            building.constructions
          );
        
        const hypotheticNextLevel = currentLevel + 1;
        const canBeDone = staticBuilding
          .extension
          .maxLevel >= hypotheticNextLevel;
        if (canBeDone) {
          nextLevel = hypotheticNextLevel;
        }
      }

      if (!improvementType) {
        throw new Error(`No improvement type could be computed for building '${code}'.`);
      }
      
      if (!nextLevel) {
        continue;
      }

      cost = _h
        .computeConstructionCost(
          staticBuilding.instantiation.cost,
          nextLevel
        );

      const { minWorkforce } = _h
        .computeConstructionDurationAndWorkforce(
          now,
          0,
          staticBuilding as IInstantiableBuilding,
          nextLevel,
          []
        );
      const workforce = {
        min: minWorkforce,
        max: minWorkforce * 2
      };

      improvableBuildings
        .push({
          building,
          cost,
          improvementType,
          nextLevel,
          workforce
        });
    }
    
    return {
      nextImprovement: improvableBuildings
        .sort(
          (a, b) => a.nextLevel - b.nextLevel
        )[0],
      total: improvableBuildings.length
    }
  }
}
