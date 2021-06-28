import { catchError } from 'rxjs/operators';
import { GarrisonService } from '../../services/garrison.service';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class GarrisonResolver implements Resolve<Observable<IGarrison>> {
  constructor(private _garrisonService: GarrisonService) {}

  resolve(): Observable<IGarrison> {
    return this._garrisonService
      .getCurrentCharacter()
      .pipe(
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}