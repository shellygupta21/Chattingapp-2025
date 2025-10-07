import { inject, Injectable } from '@angular/core';
import { AccountServiceService } from './account-service.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitServiceService {
  private accountService = inject(AccountServiceService);

  init() {
    const userString = localStorage.getItem('user');
    if(!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);

    return of(null)

  }
}
