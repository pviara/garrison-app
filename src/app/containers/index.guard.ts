import { AuthService } from './services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class IndexGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Redirect user whether is logged in or not.
   */
  canActivate() {
    const userFromStorage = this.authService.getCurrentUser();

    if (!userFromStorage)
      this.router.navigate(['/public']);
    else
      this.router.navigate(['/private']);
    
    return true;
  }
}
