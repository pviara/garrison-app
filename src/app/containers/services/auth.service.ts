import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/models/dynamic/IUser';

@Injectable()
export class AuthService {
  private _endpoint = 'auth';
  
  constructor(private _client: HttpClient) {}

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
    );
  }
}
