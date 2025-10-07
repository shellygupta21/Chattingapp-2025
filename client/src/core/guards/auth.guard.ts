import { CanActivateFn } from '@angular/router';
import { AccountServiceService } from '../services/account-service.service';
import { ToastServiceService } from '../services/toast-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServiceService);
  const toast = inject(ToastServiceService);

  if(accountService.currentUser())return true;
  else{
    toast.error('you shall not pass');
    return false;
  }

};
