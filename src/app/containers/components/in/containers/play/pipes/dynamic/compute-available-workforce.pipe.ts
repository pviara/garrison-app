import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_available_workforce'
})
export class ComputeAvailableWorkforcePipe implements PipeTransform {
  transform(
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    const peasants = dynamicUnits
      .find(unit =>
        unit.code === 'peasant'  
      );
    if (!peasants) return 0;
    
    const { assignments } = peasants.state;
    if (assignments.length === 0) {
      return peasants.quantity;
    }

    let available = peasants.quantity;
    for (const assignment of assignments) {
      if (_h.hasPast(assignment.endDate, now)) {
        continue;
      }

      available -= assignment.quantity;
    }
    
    return available;
  }
}
