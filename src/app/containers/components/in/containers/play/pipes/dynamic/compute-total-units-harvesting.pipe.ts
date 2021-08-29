import {
  GarrisonBuilding,
  GarrisonUnit
} from "src/models/dynamic/IGarrison";
import {
  Pipe,
  PipeTransform
} from "@angular/core";

@Pipe({
  name: 'compute_total_units_harvesting'
})
export class ComputeTotalUnitsHarvestingPipe implements PipeTransform {
  transform(
    code: string,
    dynamicBuildings: GarrisonBuilding[],
    dynamicUnits: GarrisonUnit[]
  ) {
    const peasant = dynamicUnits
      .find(
        unit => unit.code === 'peasant'
      );
    if (!peasant) return 0;

    let harvesting = 0;
    for (const assignment of peasant.state.assignments) {
      if (assignment.type !== 'harvest') {
        continue;
      }

      const { buildingId } = assignment;
      const dynamicBuilding = dynamicBuildings
        .find(
          building => building._id === buildingId
        );
      if (dynamicBuilding?.code !== code) {
        continue;
      }

      harvesting += assignment.quantity;
    }
    return harvesting;
  }
}
