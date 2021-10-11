import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IRecord } from 'src/models/dynamic/IRecord';

@Injectable()
export class RegisterService {
  private _endpoint = 'register';

  constructor(private _client: HttpClient) {}

  getFromGarrison(id: IGarrison['_id']) {
    return this._client.get<IRecord[]>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${id}`,
    );
  }
}