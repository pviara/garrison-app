import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { GarrisonUnit } from "src/models/dynamic/IGarrison";
import { IStaticEntity } from "src/models/static/IStaticEntity";
import { StaticHelper as _h } from "../../../../utils/helper";
import { ComputeTotalUnvailableUnitsPipe } from "./compute-total-unavailable-units.pipe";

@Pipe({
  name: 'compute_total_available_units'
})
export class ComputeTotalAvailableUnitsPipe implements PipeTransform {
  constructor(
    private _computeTotalUnavailableUnits: ComputeTotalUnvailableUnitsPipe
  ) {}
  
  transform(
    staticEntity: IStaticEntity,
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    const unit = dynamicUnits
      .find(
        dynamicUnit => dynamicUnit.code === staticEntity.code
      );
    if (!unit) {
      return 0;
    }

    const unavailable = this
      ._computeTotalUnavailableUnits
      .transform(
        staticEntity,
        dynamicUnits,
        now
      );
    
    return unit.quantity - unavailable;
  }
}
