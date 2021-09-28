import {
  IGarrison,
  UnitAssignment
} from "src/models/dynamic/IGarrison";
import {
  Pipe,
  PipeTransform
} from "@angular/core";
import { SoundService } from "src/app/shared/services/sound.service";
import { StaticHelper as _h } from "../../../../utils/helper";

@Pipe({
  name: 'compute_entity_global_state'
})
export class ComputeEntityGlobalStatePipe implements PipeTransform {
  
  private _savedBuildings: any[] = [];
  
  constructor(private _soundService: SoundService) {}
  
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

    for (const dynamicBuilding of garrison.instances.buildings) {
      const onGoing = dynamicBuilding
        .constructions
        .find(c => !_h.hasPast(c.endDate, now));
      if (!onGoing) continue;

      buildings.entities = buildings.entities.concat({
        ...onGoing,
        code: dynamicBuilding.code,
        buildingId: dynamicBuilding._id
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

      const groups = [] as {
        seriesId: string;
        code: string;
        assignments: UnitAssignment[]
      }[];

      for (const assignment of onGoing) {
        if (!assignment.seriesId) {
          continue;
        }

        const seriesMatch = groups
          .find(
            group => group.seriesId === assignment.seriesId
          );
        if (seriesMatch) {
          seriesMatch
            .assignments
            .push(assignment);
          continue;
        }

        groups
          .push({
            seriesId: assignment.seriesId,
            code: unit.code,
            assignments: [assignment]
          });
      }

      units.entities = groups;
    }

    let states: any;
    if (buildings.entities.length > 0) {
      states = (states || []).concat(buildings);
      
      for (const building of buildings.entities) {
        const index = this
          ._savedBuildings
          .findIndex(onGoing =>
            onGoing.buildingId === building._id
          );
        if (this._savedBuildings[index] < 0) {
          this
            ._savedBuildings
            .push(building);
          continue;
        }

        const isPassing = new Date(
          building.endDate
        ).getTime() - new Date().getTime() <= 1000;
        if (isPassing) {
          this
            ._savedBuildings
            .splice(index, 1);
          this._soundService.play('building_finished');
          continue;
        }
      }
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
