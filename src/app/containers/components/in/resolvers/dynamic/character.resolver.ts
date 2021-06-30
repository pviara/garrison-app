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
    const characterFromStorage = this._characterService
      .getCurrentCharacterFromStorage();
    if (characterFromStorage) {
      // FIXME please be sure that one only receive an OBJECT and NOT an array
      return Array.isArray(characterFromStorage)
        ? of(characterFromStorage[0])
        : of(characterFromStorage);
    }

    return this._characterService
      .getCurrentCharacters()
      .pipe(
        tap((characters: ICharacter[])=> {
          this._characterService.addCharacterToLocalStorage(characters);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}