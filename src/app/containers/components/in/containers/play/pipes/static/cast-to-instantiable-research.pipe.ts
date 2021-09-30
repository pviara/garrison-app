import { IInstantiableResearch } from 'src/models/static/IResearch';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'cast_to_instantiable_research'
})
export class CastToInstantiableResearchPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity) {
    return staticEntity as IInstantiableResearch;
  }
}
