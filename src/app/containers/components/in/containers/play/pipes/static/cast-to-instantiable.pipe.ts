import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  IInstantiable,
  IStaticEntity
} from 'src/models/static/IStaticEntity';

@Pipe({
  name: 'cast_to_instantiable'
})
export class CastToInstantiablePipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IInstantiable;
  }
}
