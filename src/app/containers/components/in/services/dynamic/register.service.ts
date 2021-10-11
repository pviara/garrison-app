import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IRecord } from 'src/models/dynamic/IRecord';
import { tap } from 'rxjs/operators';

@Injectable()
export class RegisterService {
  private _endpoint = 'register';

  private _records!: IRecord[];
  recordsSubject = new BehaviorSubject(this.records);
  
  set records(value: IRecord[] | undefined) {
    if (!value) return;

    this.recordsSubject.next(value);
  }

  get records() {
    return this._records;
  }
  
  constructor(private _client: HttpClient) {}

  getFromGarrison(id: IGarrison['_id']) {
    return this._client.get<IRecord[]>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${id}`,
    ).pipe(
      tap((records: IRecord[]) => this.records = records)
    );
  }
}