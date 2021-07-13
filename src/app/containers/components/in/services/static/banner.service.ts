import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBanner } from 'src/models/static/IBanner';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class BannerService {
  private _endpoint = 'banner';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addBannersToLocalStorage(banners: IBanner[]) {
    this._localStorageService.banners = banners;
    return this._localStorageService.banners;
  }
  
  getBannersFromStorage() {
    return this._localStorageService.banners;
  }
  
  getBanners() {
    return this._client.get<IBanner[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
