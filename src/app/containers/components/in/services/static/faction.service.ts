import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IFaction } from 'src/models/static/IFaction';
import { Injectable } from '@angular/core';

@Injectable()
export class FactionService {
  private _endpoint = 'faction';

  constructor(private _client: HttpClient) { }

  addFactionsToLocalStorage(factions: IFaction[]) {
    if (localStorage.getItem('factions')) {
      localStorage.removeItem('factions');
    }
    localStorage.setItem('factions', JSON.stringify(factions));
  }
  
  getFactionsFromStorage() {
    const factionsFromStorage = localStorage.getItem('factions');
    if (!factionsFromStorage) return;

    return JSON.parse(factionsFromStorage) as IFaction[];
  }
  
  getFactions() {
    return this._client.get<IFaction[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
