import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'fill_with_unusable_slots'
})
export class FillWithUnusableSlotsPipe implements PipeTransform {
  transform(staticEntities: IStaticEntity[]) {
    if (staticEntities.length === 8) return staticEntities;
    
    for (let i = 0; i < 8; i++) {
      if (staticEntities[i]) continue;
      staticEntities[i] = {
        code: '',
        word: ''
      };
    }

    return staticEntities;
  }
}