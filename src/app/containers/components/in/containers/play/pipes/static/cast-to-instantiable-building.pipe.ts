import { IInstantiableBuilding } from 'src/models/static/IBuilding';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_instantiable_building'
})
export class CastToInstantiableBuildingPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IInstantiableBuilding;
  }
}
