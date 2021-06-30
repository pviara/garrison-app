import {
  catchError,
  tap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IZone } from 'src/models/static/IZone';
import { 
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';
import { ZoneService } from '../../services/static/zone.service';

@Injectable()
export class ZoneResolver implements Resolve<Observable<IZone[]>> {
  constructor(private _zoneService: ZoneService) { }

  resolve(): Observable<IZone[]> {
    const zonesFromStorage = this._zoneService
      .getZonesFromStorage();
    if (zonesFromStorage) {
      return of(zonesFromStorage);
    }

    return this._zoneService
      .getZones()
      .pipe(
        tap((zones: IZone[]) => {
          this._zoneService.addFactionsToLocalStorage(zones);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
