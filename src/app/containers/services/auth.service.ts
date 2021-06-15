import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IAuthenticatedUser,
  IUser
} from 'src/models/dynamic/IUser';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _endpoint = 'auth';

  constructor(
    private _client: HttpClient,
    private _router: Router
  ) { }

  getCurrentUser() {
    const userFromStorage = localStorage.getItem('user');
    if (!userFromStorage) return;

    return JSON.parse(userFromStorage) as IUser;
  }

  authenticate(payload: {
    email: string;
    password: string;
  }) {
    return this._client.post<IUser>(
      `${environment.apiUrl}/${this._endpoint}`,
      payload
    ).pipe(
      map((authenticated: any) => {
        if (!authenticated.token) return;

        this._addUserToLocalStorage(authenticated);
        this._router.navigate(['/private']);
        return authenticated;
      })
    );
  }

  private _addUserToLocalStorage(
    authenticatedUser: IAuthenticatedUser
  ) {
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
  }
}
