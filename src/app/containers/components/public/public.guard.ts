import { AuthService } from '../../services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  /**
   * Redirect user if he's already logged in.
   */
  canActivate() {
    return this.authService.getCurrentUser()
      ? false
      : true;
  }
}
