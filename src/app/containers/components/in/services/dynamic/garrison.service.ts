import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IGarrisonCreate } from 'src/models/dynamic/payloads/IGarrisonCreate';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class GarrisonService {
  private _endpoint = 'garrison';
  
  constructor(
    private _authService: AuthService,
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  addGarrisonIdToLocalStorage(id: IGarrison['_id']) {
    this._localStorageService.garrisonId = id;
    return this._localStorageService.garrisonId;
  }
  
  create(payload: IGarrisonCreate) {
    return this._client.post<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}`,
      payload
    );
  }

  getCurrentGarrison() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) {
      throw new Error(
        'Method was called but process has been canceled because no user could be found.'
      );
    }

    return this._client.get<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${userFromStorage._id}`
    );
  }

  getCurrentGarrisonIdFromStorage() {
    return this._localStorageService.garrisonId;
  }
}