import { IHarvestBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_harvest_building'
})
export class CastToHarvestBuildingPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IHarvestBuilding;
  }
}
