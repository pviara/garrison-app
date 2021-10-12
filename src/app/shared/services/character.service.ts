import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { ICharacterCreate } from 'src/models/dynamic/payloads/ICharacterCreate';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class CharacterService {
  private _endpoint = 'character';
  
  constructor(
    private _authService: AuthService,
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  addCharacterToLocalStorage(characters: ICharacter[]) {
    this._localStorageService.character = characters[0];
    return this._localStorageService.character;
  }

  create(payload: ICharacterCreate) {
    console.log(this.constructor.name, 'sent payload', payload);
    return this._client.post<ICharacter>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}`,
      payload
    );
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
    return this._localStorageService.character;
  }
}