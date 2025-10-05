import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountServiceService } from '../core/services/account-service.service';
import { HomeComponent } from "../features/home/home.component";
import { User } from '../types/user';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  private accountService = inject(AccountServiceService);
  private http = inject(HttpClient);
  protected title = 'Chatting App';
  protected members = signal<User[]>([])
  // constructor(private http: HttpClient){}

  // ngOnInit(): void {
  //   this.http.get('https://localhost:7049/api/members').subscribe({
  //     // next: response => console.log(response),
  //     // next: response => this.members =response,
  //     next: response => this.members.set(response),
  //     error: error => console.log(error),
  //     complete: () => console.log('completed the http requesty')
      
  //   })
  // }

   async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
   }

   setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
   }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:7049/api/members'));

    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }


}
