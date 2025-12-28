import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServiceService } from '../../core/services/toast-service.service';
import { themes } from '../theme';
import { BusyServiceService } from '../../core/services/busy-service.service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  
  protected accountService = inject(AccountServiceService);
  protected busyService = inject(BusyServiceService);
  private router = inject(Router);
  private toast = inject(ToastServiceService);
  protected creds: any = {}
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;

  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme', this.selectedTheme());
  }

  handleSelectedTheme(theme: string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const elem = document.activeElement as HTMLDivElement;
    if (elem) elem.blur();
  }

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
