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
    const staticEntity = staticEntities.find(entity => entity.code === code);
    if (!staticEntity) {
      console.error(`No static entity was found with code '${code}'.`);
      return <IStaticEntity>{};
    }
    return staticEntity;
  }
}
