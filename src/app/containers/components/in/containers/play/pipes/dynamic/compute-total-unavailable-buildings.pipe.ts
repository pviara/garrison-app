import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonBuilding } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';

@Pipe({
  name: 'compute_total_unavailable_buildings'
})
export class ComputeTotalUnavailableBuildingsPipe implements PipeTransform {
  transform(
    staticEntity: IStaticEntity,
    dynamicBuildings: GarrisonBuilding[],
    now: Date
  ) {
    let count = 0;
    
    for (const dynamicBuilding of dynamicBuildings) {
      const available = dynamicBuilding
        .constructions
        .some(c => now.getTime() < (new Date(c.endDate)).getTime());
      
      if (
        dynamicBuilding.code !== staticEntity.code || !available
      ) continue;

      count++;
    }

    return count || '0';
  }
}
