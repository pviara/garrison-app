import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResearch } from 'src/models/static/IResearch';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable()
export class ResearchService {
  private _endpoint = 'research';

  constructor(
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  addResearchesToLocalStorage(researches: IResearch[]) {
    this._localStorageService.researches = researches;
    return this._localStorageService.researches;
  }
  
  getResearchesFromStorage() {
    return this._localStorageService.researches;
  }
  
  getResearches() {
    return this._client.get<IResearch[]>(
      `${environment.apiUrl}/${environment.dbNameStatic}/${this._endpoint}`
    );
  }
}
