import { AuthService } from '../../../../shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ICharacter } from 'src/models/dynamic/ICharacter';
import { Injectable } from '@angular/core';

@Injectable()
export class GarrisonService {
  private _endpoint = 'garrison';
  
  constructor(
    private _client: HttpClient,
    private _authService: AuthService
  ) {}

  getCurrentCharacter() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) {
      throw new Error(
        'Method was called but process has been canceled because no user could be found.'
      );
    }

    return this._client.get<ICharacter>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${userFromStorage._id}`
    );
  }
}