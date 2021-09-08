import {
  GarrisonUnit,
  GarrisonUnitAssignment
} from "src/models/dynamic/IGarrison";
import { IStaticEntity } from "src/models/static/IStaticEntity";
import { StaticHelper as _h } from "../../../../utils/helper";
import {
  Pipe,
  PipeTransform
} from "@angular/core";

@Pipe({
  name: 'compute_total_unavailable_units'
})
export class ComputeTotalUnvailableUnitsPipe implements PipeTransform {
  transform(
    staticEntity: IStaticEntity,
    dynamicUnits: GarrisonUnit[],
    now: Date,
    improvementType?: GarrisonUnitAssignment
  ) {
    const unit = dynamicUnits
      .find(
        dynamicUnit => dynamicUnit.code === staticEntity.code
      );
    if (!unit) {
      return 0;
    }

    return unit
      .state
      .assignments
      .filter(
        assignment => {
          let condition = !_h.hasPast(assignment.endDate, now);
          if (improvementType) {
            condition = condition && assignment.type === improvementType;
          }
          return condition;
        }
      )
      .map(
        assignment => assignment.quantity
      )
      .reduce(
        (prev, next) => prev + next, 0
      );
  }
}
