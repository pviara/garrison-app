import {
  catchError,
  tap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IUnit } from 'src/models/static/IUnit';
import { 
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';
import { UnitService } from '../../services/static/unit.service';

@Injectable()
export class UnitResolver implements Resolve<Observable<IUnit[]>> {
  constructor(private _unitService: UnitService) { }

  resolve(): Observable<IUnit[]> {
    const unitsFromStorage = this._unitService
      .getUnitsFromStorage();
    if (unitsFromStorage) {
      return of(unitsFromStorage);
    }

    return this._unitService
      .getUnits()
      .pipe(
        tap((units: IUnit[]) => {
          this._unitService.addUnitsToLocalStorage(units);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
