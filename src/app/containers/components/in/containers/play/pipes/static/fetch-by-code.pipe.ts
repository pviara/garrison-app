import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'fetch_by_code'
})
export class FetchByCodePipe implements PipeTransform {
  transform(
    staticEntities: IStaticEntity[],
    code: string
  ) {
    return staticEntities.find(entity => entity.code === code);
  }
}
