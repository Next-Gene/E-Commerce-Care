import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth/auth.service';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);

  let currentUser = auth.currentToken;

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
  }
  return next(req);
};