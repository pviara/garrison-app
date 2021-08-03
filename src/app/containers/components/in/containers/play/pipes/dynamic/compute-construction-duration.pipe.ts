import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonResearch } from 'src/models/dynamic/IGarrison';
import { IInstantiableBuilding } from 'src/models/static/IBuilding';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_construction_duration'
})
export class ComputeConstructionDurationPipe implements PipeTransform {
  transform(
    building: IInstantiableBuilding,
    workforce: number,
    dynamicResearches: GarrisonResearch[],
    now: Date,
    improvementLevel = 0
  ) {
    const { minWorkforce } = building.instantiation;
    if (workforce < minWorkforce) {
      workforce = minWorkforce;
    }
    
    return Math.floor(
      _h.computeConstructionDurationAndWorkforce(
        now,
        workforce,
        building,
        improvementLevel,
        dynamicResearches
      )
      .duration
    );
  }
}
