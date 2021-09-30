import { ComputeAvailableBuildingWorkforcePipe } from './compute-available-building-workforce.pipe';
import { GarrisonUnit } from 'src/models/dynamic/IGarrison';
import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_unavailable_building_workforce'
})
export class ComputeUnvailableBuildingWorkforcePipe implements PipeTransform {
  constructor(
    private _computeAvailableBuildingWorkforcePipe: ComputeAvailableBuildingWorkforcePipe
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
      ._computeAvailableBuildingWorkforcePipe
      .transform(
        dynamicUnits,
        now
      );
    
    return total - available;
  }
}
