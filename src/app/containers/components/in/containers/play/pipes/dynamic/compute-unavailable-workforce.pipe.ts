import { ComputeAvailableWorkforcePipe } from './compute-available-workforce.pipe';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_available_workforce'
})
export class ComputeUnvailableWorkforcePipe implements PipeTransform {
  constructor(
    private _computeAvailableWorkforcePipe: ComputeAvailableWorkforcePipe
  ) {}
  
  transform(
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    const peasants = dynamicUnits
      .find(unit =>
        unit.code === 'peasant'  
      );
    if (!peasants) return 0;

    const { quantity: total } = peasants;
    
    const available = this
      ._computeAvailableWorkforcePipe
      .transform(
        dynamicUnits,
        now
      );
    
    return total - available;
  }
}
