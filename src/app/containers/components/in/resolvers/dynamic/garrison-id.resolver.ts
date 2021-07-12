import {
  catchError,
  tap
} from 'rxjs/operators';
import { GarrisonService } from '../../services/dynamic/garrison.service';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class GarrisonIdResolver implements Resolve<Observable<string | null>> {
  constructor(private _garrisonService: GarrisonService) {}

  resolve(): Observable<string | null> {
    const garrisonIdFromStorage = this._garrisonService
      .getCurrentGarrisonIdFromStorage();
    if (garrisonIdFromStorage) {
      return of(garrisonIdFromStorage);
    }

    return this._garrisonService
      .getCurrentGarrison()
      .pipe(
        tap((garrison: IGarrison)=> {
          this._garrisonService.addGarrisonIdToLocalStorage(garrison._id);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}