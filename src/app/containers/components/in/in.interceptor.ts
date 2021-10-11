import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class InInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}
  
  intercept(req: HttpRequest<any> , next: HttpHandler) {
    const userFromStorage = this
      ._authService
      .getCurrentUserFromStorage();

    if (userFromStorage) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userFromStorage.token}`
        }
      });
    }
    return next.handle(req);
  }
}
