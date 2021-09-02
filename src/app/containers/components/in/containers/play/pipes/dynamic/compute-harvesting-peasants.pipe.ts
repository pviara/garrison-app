import {
  Pipe,
  PipeTransform
} from '@angular/core';
import { GarrisonBuilding, GarrisonUnit } from 'src/models/dynamic/IGarrison';
import { StaticHelper as _h } from '../../../../utils/helper';

@Pipe({
  name: 'compute_harvesting_peasants'
})
export class ComputeHarvestingPeasantsPipe implements PipeTransform {
  transform(
    dynamicBuildings: GarrisonBuilding[],
    dynamicUnits: GarrisonUnit[],
    harvestCode: 'goldmine' | 'sawmill',
    now: Date
  ) {
    const peasants = dynamicUnits
      .find(
        unit => unit.code === 'peasant'
      );
    if (!peasants) {
      return 0;
    }

    const harvestBuildings = dynamicBuildings
      .filter(
        building => building.code === harvestCode
      );

    return peasants
      .state
      .assignments
      .filter(
        assignment =>
          assignment.type === 'harvest'
          && !_h.hasPast(assignment.endDate, now)
          && harvestBuildings
            .find(
              building => building._id === assignment.buildingId
            )
      )
      .map(assignment => assignment.quantity)
      .reduce((prev, next) => prev + next, 0);
  }
}
