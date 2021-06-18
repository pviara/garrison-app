import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedUser } from 'src/models/dynamic/IUser';
import { Injectable } from '@angular/core';
import { IUserCreate } from 'src/models/dynamic/payloads/IUserCreate';

@Injectable()
export class UserService {
  private _endpoint = 'user';
  
  constructor(private _client: HttpClient) { }

  create(payload: IUserCreate) {
    return this._client.post<IAuthenticatedUser>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}`,
      payload
    );
  }
}