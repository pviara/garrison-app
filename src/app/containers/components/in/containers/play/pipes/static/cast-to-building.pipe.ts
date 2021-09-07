import { IBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_building'
})
export class CastToBuildingPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IBuilding;
  }
}
