import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { FetchByCodePipe } from '../../../pipes/static/fetch-by-code.pipe';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingInstanceGuard implements CanActivate {
  private _fetchByCodePipe = new FetchByCodePipe();
  
  constructor(
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot) {
    const code = next.paramMap.get('code');
    console.log(code);
    if (!code) {
      this._router.navigate(['/in/play/buildings']);
      return false;
    }

    const staticEntity = this
      ._fetchByCodePipe
      .transform(this._localStorageService.buildings || [], code);
    if (!staticEntity) {
      this._router.navigate(['/in/play/buildings']);
      return false;
    }

    return true;
  }
}
