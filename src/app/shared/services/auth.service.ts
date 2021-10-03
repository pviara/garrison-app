import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedUser } from 'src/models/dynamic/IUser';
import { IAuthenticationPayload } from 'src/models/dynamic/payloads/IAuthenticationPayload';
import { Injectable } from '@angular/core';
import { IUserCreate } from 'src/models/dynamic/payloads/IUserCreate';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
  private _endpoint = 'auth';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addUserToLocalStorage(
    authenticatedUser: IAuthenticatedUser
  ) {
    this._localStorageService.user = authenticatedUser;
    return this._localStorageService.user;
  }

  authenticate(payload: IAuthenticationPayload) {
    return this._client.post<IAuthenticatedUser>(
      `${environment.apiUrl}/${this._endpoint}`,
      payload
    );
  }

  create(payload: IUserCreate) {
    return this._client.post<IAuthenticatedUser>(
      `${environment.apiUrl}/${this._endpoint}/user`,
      payload
    );
  }

  getCurrentUserFromStorage() {
    return this._localStorageService.user;
  }
}
