import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { Injectable } from '@angular/core';

@Injectable()
export class CharacterService {
  private _endpoint = 'character';
  
  constructor(
    private _client: HttpClient,
    private _authService: AuthService
  ) {}

  addCharacterToLocalStorage(characters: ICharacter[]) {
    if (localStorage.getItem('character')) {
      localStorage.removeItem('character');
    }
    localStorage.setItem('character', JSON.stringify(characters[0]));
    console.log(localStorage.getItem('character'));
  }
  
  getCurrentCharacters() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) {
      throw new Error(
        'Method was called but process has been canceled because no user could be found.'
      );
    }

    return this._client.get<ICharacter[]>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${userFromStorage._id}`
    );
  }

  getCurrentCharacterFromStorage() {
    const characterFromStorage = localStorage.getItem('character');
    if (!characterFromStorage) return;

    return JSON.parse(characterFromStorage) as ICharacter;
  }
}