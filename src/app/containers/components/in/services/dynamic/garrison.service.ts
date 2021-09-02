import { AuthService } from 'src/app/shared/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBuildingCreate } from 'src/models/dynamic/payloads/IBuildingCreate';
import { IBuildingConstructionCancel } from 'src/models/dynamic/payloads/IBuildingConstructionCancel';
import { IGarrison } from 'src/models/dynamic/IGarrison';
import { IGarrisonCreate } from 'src/models/dynamic/payloads/IGarrisonCreate';
import { Injectable } from '@angular/core';
import { IUnitAssign } from 'src/models/dynamic/payloads/IUnitAssign';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class GarrisonService {
  private _endpoint = 'garrison';

  private _garrison!: IGarrison;
  garrisonSubject = new BehaviorSubject(this.garrison);
  
  set garrison(value: IGarrison | undefined) {
    if (!value) return;

    this.garrisonSubject.next(value);
  }

  get garrison() {
    return this._garrison;
  }
  
  constructor(
    private _authService: AuthService,
    private _client: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  addGarrisonIdToLocalStorage(id: IGarrison['_id']) {
    this._localStorageService.garrisonId = id;
    return this._localStorageService.garrisonId;
  }

  assignUnit(payload: IUnitAssign) {
    return this._client.put<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/unit/assign`,
      payload
    ).pipe(
      tap((garrison: IGarrison) => this.garrison = garrison)
    );
  }

  cancelConstruction(payload: IBuildingConstructionCancel) {
    return this._client.put<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/building/cancel`,
      payload
    ).pipe(
      tap((garrison: IGarrison) => this.garrison = garrison)
    );
  }
  
  create(payload: IGarrisonCreate) {
    return this._client.post<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}`,
      payload
    );
  }

  createBuilding(payload: IBuildingCreate) {
    return this._client.post<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/building`,
      payload
    ).pipe(
      tap((garrison: IGarrison) => this.garrison = garrison)
    );
  }

  getCurrentGarrison() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    if (!userFromStorage) {
      throw new Error(
        'Method was called but process has been canceled because no user could be found.'
      );
    }

    return this._client.get<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/${userFromStorage._id}`
    ).pipe(
      tap((garrison: IGarrison) => this.garrison = garrison)
    );
  }

  getCurrentGarrisonIdFromStorage() {
    return this._localStorageService.garrisonId;
  }

  unassignUnit(payload: IUnitAssign) {
    return this._client.put<IGarrison>(
      `${environment.apiUrl}/${environment.dbNameDynamic}/${this._endpoint}/unit/unassign`,
      payload
    ).pipe(
      tap((garrison: IGarrison) => this.garrison = garrison)
    );
  }
}