import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { IBuilding, IRequiredBuilding } from 'src/models/static/IBuilding';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';

@Pipe({
  name: 'compute_construction_requirements'
})
export class ComputeConstructionRequirementsPipe implements PipeTransform {
  transform(
    staticBuilding: IBuilding,
    dynamicBuildings: GarrisonBuilding[],
    now: Date
  ) {
    const requiredBuildings = <{
      code: string;
      completed: boolean;
      upgradeLevel?: number;
    }[]>[];
    
    const { requiredEntities } = staticBuilding.instantiation;
    if (!requiredEntities) return null;

    for (const required of requiredEntities.buildings) {
      const addedIndex = requiredBuildings
        .push({
          code: required.code,
          completed: false
        }) - 1;
      
      const existing = dynamicBuildings.find(dB => dB.code === required.code);

      // check whether the required building is an upgraded building or not
      const { upgradeLevel } = required;
      if (!upgradeLevel) {

        // check whether instantiation has already been cleaned up because it was finished
        const instantiation = existing?.constructions[0];
        if (!instantiation) continue;
        
        // check whether the building is still being processed for its instantiation
        const endDate = new Date(instantiation.endDate);
        if (endDate.getTime() < now.getTime()) {
          requiredBuildings[addedIndex].completed = true;
        }
        continue;

      }

      // check whether the building is at the required upgrade level
      const upgrade = existing
        ?.constructions
        .find(c => c.improvement?.level || 0 >= upgradeLevel);
      requiredBuildings[addedIndex].upgradeLevel = upgradeLevel;
      if (!upgrade) continue;

      // check whether the building is still being processed for its upgrade
      const endDate = new Date(upgrade.endDate);
      if (endDate.getTime() < now.getTime()) {
        requiredBuildings[addedIndex].completed = true;
      }
    }

    return requiredBuildings;
  }
}