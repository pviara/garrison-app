import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUnit } from 'src/models/static/IUnit';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class UnitService {
  private _endpoint = 'unit';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addUnitsToLocalStorage(units: IUnit[]) {
    this._localStorageService.units = units;
    return this._localStorageService.units;
  }
  
  getUnitsFromStorage() {
    return this._localStorageService.units;
  }
  
  getUnits() {
    return this._client.get<IUnit[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
