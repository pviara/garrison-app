import {
  catchError,
  tap
} from 'rxjs/operators';
import { FactionService } from '../../services/static/faction.service';
import { IFaction } from 'src/models/static/IFaction';
import { Injectable } from '@angular/core';
import { 
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class FactionResolver implements Resolve<Observable<IFaction[]>> {
  constructor(private _factionService: FactionService) { }

  resolve(): Observable<IFaction[]> {
    const factionsFromStorage = this._factionService
      .getFactionsFromStorage();
    if (factionsFromStorage) {
      return of(factionsFromStorage);
    }

    return this._factionService
      .getFactions()
      .pipe(
        tap((factions: IFaction[]) => {
          this._factionService.addFactionsToLocalStorage(factions);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
