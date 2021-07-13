import { BuildingService } from '../../services/static/building.service';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IBuilding } from 'src/models/static/IBuilding';
import { 
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class BuildingResolver implements Resolve<Observable<IBuilding[]>> {
  constructor(private _buildingService: BuildingService) { }

  resolve(): Observable<IBuilding[]> {
    const buildingsFromStorage = this._buildingService
      .getBuildingsFromStorage();
    if (buildingsFromStorage) {
      return of(buildingsFromStorage);
    }

    return this._buildingService
      .getBuildings()
      .pipe(
        tap((factions: IBuilding[]) => {
          this._buildingService.addBuildingsToLocalStorage(factions);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
