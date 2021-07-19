import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Pipe({
  name: 'compute_total_available_buildings'
})
export class ComputeTotalAvailableBuildingsPipe implements PipeTransform {
  transform(
    staticEntity: IStaticEntity,
    dynamicBuildings: GarrisonBuilding[],
    now: Date
  ) {
    let count = 0;
    
    for (const dynamicBuilding of dynamicBuildings) {
      const available = dynamicBuilding
        .constructions
        .every(c => (new Date(c.endDate)).getTime() < now.getTime());
      
      if (
        dynamicBuilding.code !== staticEntity.code || !available
      ) continue;

      count++;
    }

    return count || '0';
  }
}
