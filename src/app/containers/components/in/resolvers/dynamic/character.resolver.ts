import {
  catchError, tap
} from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/services/character.service';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class CharacterResolver implements Resolve<Observable<ICharacter>> {
  constructor(private _characterService: CharacterService) {}

  resolve(): Observable<ICharacter> {
    console.log('called resolver');
    
    const characterFromStorage = this._characterService
      .getCurrentCharacterFromStorage();
    if (characterFromStorage) {
      return of(characterFromStorage);
    }

    return this._characterService
      .getCurrentCharacters()
      .pipe(
        tap((characters: ICharacter[])=> {
          this._characterService.addCharacterToLocalStorage(characters);
          console.log('from resolver', localStorage.getItem('character'));
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}