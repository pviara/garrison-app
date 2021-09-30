import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonResearch } from 'src/models/dynamic/IGarrison';
import { IInstantiableResearch, IResearch } from 'src/models/static/IResearch';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_launching_duration'
})
export class ComputeLaunchingDurationPipe implements PipeTransform {
  transform(
    research: IInstantiableResearch,
    workforce: number,
    projectLevel = 0
  ) {
    const { minWorkforce } = research.instantiation;
    if (workforce < minWorkforce) {
      workforce = minWorkforce;
    }
    
    return Math.floor(
      _h.computeResearchDurationAndWorkforce(
        workforce,
        research as IResearch,
        projectLevel
      )
      .duration
    );
  }
}
