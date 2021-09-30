import { ComputeAvailableBuildingWorkforcePipe } from "./compute-available-building-workforce.pipe";
import {
  GarrisonBuilding,
  GarrisonUnit
} from "src/models/dynamic/IGarrison";
import { IHarvestBuilding } from "src/models/static/IBuilding";
import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { StaticHelper as _h } from "../../../../utils/helper";

@Pipe({
  name: 'compute_harvest_workforce_limit'
})
export class ComputeHarvestWorkforceLimitPipe implements PipeTransform {
  constructor(private _computeAvailableWorkforcePipe: ComputeAvailableBuildingWorkforcePipe) {}
  
  transform(
    staticBuilding: IHarvestBuilding,
    dynamicBuildings: GarrisonBuilding[],
    dynamicUnits: GarrisonUnit[],
    now: Date
  ) {
    const harvestBuildings = dynamicBuildings
      .filter(building => {
        const available = _h
          .checkBuildingAvailability(
            now,
            building
          );

        if (building.code === staticBuilding.code && available) {
          return building;
        }

        return null;
      });
    
    let limit = 0;
    for (const harvestBuilding of harvestBuildings) {
      const currentLevel = _h
        .computeBuildingCurrentLevel(
          now,
          'extension',
          harvestBuilding.constructions
        );
      const maxWorkforce = Math.floor(
        (staticBuilding.harvest.maxWorkforce || 0) * Math.pow(1.3, currentLevel)
      );

      limit += maxWorkforce;
    }

    const availablePeasants = this
      ._computeAvailableWorkforcePipe
      .transform(
        dynamicUnits,
        now
      );
    
    if (availablePeasants < limit) {
      return availablePeasants;
    } else if (availablePeasants > limit) {
      return limit;
    }

    return availablePeasants;
  }
}
