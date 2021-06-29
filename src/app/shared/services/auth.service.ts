import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedUser } from 'src/models/dynamic/IUser';
import { IAuthenticationPayload } from 'src/models/dynamic/payloads/IAuthenticationPayload';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private _endpoint = 'auth';

  constructor(private _client: HttpClient) { }

  addUserToLocalStorage(
    authenticatedUser: IAuthenticatedUser
  ) {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
  }

  authenticate(payload: IAuthenticationPayload) {
    return this._client.post<IAuthenticatedUser>(
      `${environment.apiUrl}/${this._endpoint}`,
      payload
    );
  }

  getCurrentUserFromStorage() {
    const userFromStorage = localStorage.getItem('user');
    if (!userFromStorage) return;

    return JSON.parse(userFromStorage) as IAuthenticatedUser;
  }
}
