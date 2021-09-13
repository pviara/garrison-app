import { IInstantiableUnit } from 'src/models/static/IUnit';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_instantiable_unit'
})
export class CastToInstantiableUnitPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IInstantiableUnit;
  }
}
