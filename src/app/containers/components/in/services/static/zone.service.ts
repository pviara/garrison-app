import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IZone } from 'src/models/static/IZone';

@Injectable()
export class ZoneService {
  private _endpoint = 'zone';

  constructor(private _client: HttpClient) { }

  addFactionsToLocalStorage(zones: IZone[]) {
    if (localStorage.getItem('zones')) {
      localStorage.removeItem('zones');
    }
    localStorage.setItem('zones', JSON.stringify(zones));
  }
  
  getZonesFromStorage() {
    const zonesFromStorage = localStorage.getItem('zones');
    if (!zonesFromStorage) return;

    return JSON.parse(zonesFromStorage) as IZone[];
  }
  
  getZones() {
    return this._client.get<IZone[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
