import { AuthService } from '../../services/auth.service';
import {
  CanActivate,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Redirect user if he's already logged in.
   */
  canActivate() {
    const userFromStorage = this.authService.getCurrentUser();
    
    if (!userFromStorage) return true;
    else {
      this.router.navigate(['/in']);
      return false;
    }
  }
}
