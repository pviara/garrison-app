import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { IGarrisonUnitAssignment, IOperatedConstruction } from "src/models/dynamic/IGarrison";

@Pipe({
  name: 'compute_occupation_remaining_time'
})
export class ComputeOccupationRemainingTime implements PipeTransform {
  transform(
    occupation: IOperatedConstruction | IGarrisonUnitAssignment| { endDate: Date },
    now: Date
  ) {
    const endDate = new Date(occupation.endDate);
    const nowDate = new Date(now);
    const instant = new Date(endDate.getTime() - nowDate.getTime());

    let remaining = '';
    [{
      identifier: 'h', value: instant.getHours() - 1
    }, {
      identifier: 'm', value: instant.getMinutes()
    }, {
      identifier: 's', value: instant.getSeconds()
    }].forEach(el => remaining += (el.value >= 0) ? ` ${el.value}${el.identifier}` : '');

    return remaining;
  }
}
