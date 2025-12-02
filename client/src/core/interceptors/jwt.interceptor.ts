import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const accountService = inject(AccountServiceService);

  const user = accountService.currentUser();

  if(user){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    })
  }
  return next(req);
};
