import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBuilding } from 'src/models/static/IBuilding';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class BuildingService {
  private _endpoint = 'building';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addBuildingsToLocalStorage(buildings: IBuilding[]) {
    this._localStorageService.buildings = buildings;
    return this._localStorageService.buildings;
  }
  
  getBuildingsFromStorage() {
    return this._localStorageService.buildings;
  }
  
  getBuildings() {
    return this._client.get<IBuilding[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
