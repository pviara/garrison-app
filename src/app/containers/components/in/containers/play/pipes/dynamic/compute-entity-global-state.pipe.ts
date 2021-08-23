import { BuildingService } from "../../../../services/static/building.service";
import { IGarrison } from "src/models/dynamic/IGarrison";
import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { IBuilding } from "src/models/static/IBuilding";
import { IResearch } from "src/models/static/IResearch";
import { IUnit } from "src/models/static/IUnit";
import { ResearchService } from "../../../../services/static/research.service";
import { UnitService } from "../../../../services/static/unit.service";
import { StaticHelper as _h } from "../../../../utils/helper";

@Pipe({
  name: 'compute_entity_global_state'
})
export class ComputeEntityGlobalStatePipe implements PipeTransform {
  
  private _buildings!: IBuilding[];
  private _researches!: IResearch[];
  private _units!: IUnit[];
  
  constructor(
    private _buildingService: BuildingService,
    private _researchService: ResearchService,
    private _unitService: UnitService
  ) {
    // const buildingsFromStorage = this._buildingService.getBuildingsFromStorage();
    // if (!buildingsFromStorage) {
    //   throw new Error('Static buildings should be existing in storage.');
    // }
    // this._buildings = buildingsFromStorage;

    // const researchesFromStorage = this._researchService.getResearchesFromStorage();
    // if (!researchesFromStorage) {
    //   throw new Error('Static researches should be existing in storage.');
    // }
    // this._researches = researchesFromStorage;

    // const unitsFromStorage = this._unitService.getUnitsFromStorage();
    // if (!unitsFromStorage) {
    //   throw new Error('Static units should be existing in storage.');
    // }
    // this._units = unitsFromStorage;
  }
  
  transform(
    garrison: IGarrison,
    now: Date
  ) {
    const buildings = {
      entityType: 'buildings',
      entities: [] as any[]
    };

    const researches = {
      entityType: 'researches',
      entities: [] as any[]
    };

    const units = {
      entityType: 'units',
      entities: [] as any[]
    };

    for (const building of garrison.instances.buildings) {
      const onGoing = building
        .constructions
        .find(c => !_h.hasPast(c.endDate, now));
      if (!onGoing) continue;

      buildings.entities = buildings.entities.concat({
        ...onGoing,
        code: building.code,
        buildingId: building._id
      });
    }

    for (const research of garrison.instances.researches) {
      const onGoing = research
        .projects
        .find(p => !_h.hasPast(p.endDate, now));
      if (!onGoing) continue;

      researches.entities = researches.entities.concat({
        ...onGoing,
        code: research.code,
        researchId: research._id
      });
    }

    for (const unit of garrison.instances.units) {
      const onGoing = unit
        .state
        .assignments
        .filter(a => a.type === 'instantiation' && !_h.hasPast(a.endDate, now));
      if (onGoing.length === 0) continue;

      for (const assignement of onGoing) {
        units.entities.push({
          ...assignement,
          code: unit.code
        });
      }
    }

    let states: any;
    if (buildings.entities.length > 0) {
      states = (states || []).concat(buildings);
    }
    if (researches.entities.length > 0) {
      states = (states || []).concat(researches);
    }
    if (units.entities.length > 0) {
      states = (states || []).concat(units);
    }
    return states;
  }
}
