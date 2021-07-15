import {
  catchError,
  tap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IResearch } from 'src/models/static/IResearch';
import { 
  Observable,
  of
} from 'rxjs';
import { ResearchService } from '../../services/static/research.service';
import { Resolve } from '@angular/router';

@Injectable()
export class ResearchResolver implements Resolve<Observable<IResearch[]>> {
  constructor(private _researchService: ResearchService) { }

  resolve(): Observable<IResearch[]> {
    const researchesFromStorage = this._researchService
      .getResearchesFromStorage();
    if (researchesFromStorage) {
      return of(researchesFromStorage);
    }

    return this._researchService
      .getResearches()
      .pipe(
        tap((researches: IResearch[]) => {
          this._researchService.addResearchesToLocalStorage(researches);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
