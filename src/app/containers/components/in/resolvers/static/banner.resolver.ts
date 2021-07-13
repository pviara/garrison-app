import { BannerService } from '../../services/static/banner.service';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IBanner } from 'src/models/static/IBanner';
import { 
  Observable,
  of
} from 'rxjs';
import { Resolve } from '@angular/router';

@Injectable()
export class BannerResolver implements Resolve<Observable<IBanner[]>> {
  constructor(private _bannerService: BannerService) { }

  resolve(): Observable<IBanner[]> {
    const bannersFromStorage = this._bannerService
      .getBannersFromStorage();
    if (bannersFromStorage) {
      return of(bannersFromStorage);
    }

    return this._bannerService
      .getBanners()
      .pipe(
        tap((factions: IBanner[]) => {
          this._bannerService.addBannersToLocalStorage(factions);
        }),
        catchError((error: any, caught: Observable<any>) => {
          return of(null);
        })
      );
  }
}
