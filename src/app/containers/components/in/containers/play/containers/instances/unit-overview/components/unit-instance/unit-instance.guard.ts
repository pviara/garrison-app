import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { FetchByCodePipe } from 'src/app/shared/pipes/static/fetch-by-code.pipe';
import { Injectable } from '@angular/core';
import { UnitService } from 'src/app/containers/components/in/services/static/unit.service';
import { StaticHelper as _h } from 'src/app/containers/components/in/utils/helper';

@Injectable()
export class UnitInstanceGuard implements CanActivate {
  private _fetchByCodePipe = new FetchByCodePipe();
  
  constructor(
    private _unitService: UnitService,
    private _router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot) {
    const code = next.paramMap.get('code');
    if (!code) {
      this._router.navigate(['/in/play/units']);
      return false;
    }

    const unitsFromStorage = this
      ._unitService
      .getUnitsFromStorage();

    const staticEntity = this
      ._fetchByCodePipe
      .transform(unitsFromStorage || [], code);
    if (_h.isObjectEmpty(staticEntity)) {
      this._router.navigate(['/in/play/units']);
      return false;
    }

    return true;
  }
}
