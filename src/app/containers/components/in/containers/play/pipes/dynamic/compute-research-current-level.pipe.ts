import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonResearch } from 'src/models/dynamic/IGarrison';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_research_current_level'
})
export class ComputeResearchCurrentLevelPipe implements PipeTransform {
  transform(
    staticEntity: IStaticEntity,
    researches: GarrisonResearch[],
    now: Date
  ) {
    const research = researches
      .find(
        research => research.code === staticEntity.code
      );
    if (!research) {
      return '0';
    }

    return _h.computeResearchCurrentLevel(
      now,
      research.projects
    );
  }
}
