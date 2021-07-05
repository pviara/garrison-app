import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IFaction } from 'src/models/static/IFaction';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class FactionService {
  private _endpoint = 'faction';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addFactionsToLocalStorage(factions: IFaction[]) {
    this._localStorageService.factions = factions;
    return this._localStorageService.factions;
  }
  
  getFactionsFromStorage() {
    return this._localStorageService.factions;
  }
  
  getFactions() {
    return this._client.get<IFaction[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
