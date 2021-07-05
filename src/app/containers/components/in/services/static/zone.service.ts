import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZone } from 'src/models/static/IZone';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class ZoneService {
  private _endpoint = 'zone';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addFactionsToLocalStorage(zones: IZone[]) {
    this._localStorageService.zones = zones;
    return this._localStorageService.zones;
  }
  
  getZonesFromStorage() {
    return this._localStorageService.zones;
  }
  
  getZones() {
    return this._client.get<IZone[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
