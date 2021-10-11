import { Injectable } from '@angular/core';
import { IRecord } from 'src/models/dynamic/IRecord';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Observable, of } from 'rxjs';
import { RegisterService } from '../../services/dynamic/register.service';
import { Resolve } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RegisterResolver implements Resolve<Observable<IRecord[]>> {
  constructor(
    private _localStorageService: LocalStorageService,
    private _registerService: RegisterService
  ) {}

  resolve(): Observable<IRecord[]> {
    const garrisonId = this._localStorageService.garrisonId;
    if (!garrisonId) {
      throw new Error('Garrison id should be existing in this state of application.');
    }
    return this
      ._registerService
      .getFromGarrison(garrisonId)
      .pipe(
        catchError((error: any, caught: Observable<any>) => {
          return of([]);
        })
      );
  }
}