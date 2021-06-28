import { AuthService } from '../../../shared/services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class InGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  /**
   * Redirect user if he's not logged in.
   */
  canActivate() {
    const userFromStorage = this._authService.getCurrentUserFromStorage();
    
    if (userFromStorage) return true;
    else {
      this._router.navigate(['/public']);
      return false;
    }
  }
}
