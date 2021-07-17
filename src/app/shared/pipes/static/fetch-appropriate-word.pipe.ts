import { environment } from 'src/environments/environment';
import { IStaticEntity } from 'src/models/static/IStaticEntity';
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'fetch_appropriate_word'
})
export class FetchAppropriateWordPipe implements PipeTransform {
  transform(staticEntity: IStaticEntity, faction?: string) {
    if (Array.isArray(staticEntity.word)) {
      if (!faction) {
        throw new Error('Cannot fetch appropriate word since no faction was given.');
      }
      const { word: words } = staticEntity;
      return words.find(word => word.side === faction)?.jargon || 'unknown';
    }

    if (faction && !environment.production) {
      console.warn('Warning: irrelevant to give the faction as an argument in that case.')
    }
    return staticEntity.word;
  }
}