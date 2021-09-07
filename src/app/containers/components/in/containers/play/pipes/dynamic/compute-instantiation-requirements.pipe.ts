import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';
import { IInstantiable } from 'src/models/static/IStaticEntity';

@Pipe({
  name: 'compute_instantiation_requirements'
})
export class ComputeInstantiationRequirementsPipe implements PipeTransform {
  transform(
    staticEntity: IInstantiable,
    dynamicBuildings: GarrisonBuilding[],
    now: Date
  ) {
    const requiredBuildings = <{
      code: string;
      completed: boolean;
      upgradeLevel?: number;
    }[]>[];
    
    const { requiredEntities } = staticEntity.instantiation;
    if (!requiredEntities) return null;

    for (const required of requiredEntities.buildings) {
      const addedIndex = requiredBuildings
        .push({
          code: required.code,
          completed: false
        }) - 1;
      
      const existing = dynamicBuildings.find(dB => dB.code === required.code);
      if (!existing) {
        continue;
      }

      // check whether the required building is an upgraded building or not
      const { upgradeLevel } = required;
      if (!upgradeLevel) {
        
        // check whether the building is still being processed for its instantiation
        const instantiation = existing?.constructions[0];
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