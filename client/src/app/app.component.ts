import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  private http = inject(HttpClient);
  protected title = 'Chatting App';
  protected members = signal<any>([])
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
    this.members.set(await this.getMembers())
   }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get('https://localhost:7049/api/members'));

    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }


}
