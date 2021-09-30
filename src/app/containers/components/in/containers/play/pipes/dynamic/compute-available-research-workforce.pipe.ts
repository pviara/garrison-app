import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_available_research_workforce'
})
export class ComputeAvailableResearchWorkforcePipe implements PipeTransform {
  transform(
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    const researchers = dynamicUnits
      .find(unit =>
        unit.code === 'researcher'  
      );
    if (!researchers) return 0;
    
    const { assignments } = researchers.state;
    if (assignments.length === 0) {
      return researchers.quantity;
    }

    let available = researchers.quantity;
    for (const assignment of assignments) {
      if (_h.hasPast(assignment.endDate, now)) {
        continue;
      }

      available -= assignment.quantity;
    }
    
    return available;
  }
}
