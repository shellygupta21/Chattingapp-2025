import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServiceService } from '../../core/services/toast-service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected accountService = inject(AccountServiceService)
  private router = inject(Router);
  private toast = inject(ToastServiceService);
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => { 
        this.router.navigateByUrl('/members');
        console.log(result);
        this.toast.success('logged in successfully');
        this.creds = {};
      },
        error: error => {
          console.log(error);
          this.toast.error(error.error);
        }
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');

  }
}
