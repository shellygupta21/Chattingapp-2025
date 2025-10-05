import { Component, inject, input, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountServiceService } from '../../../core/services/account-service.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // membersFromHome = input.required<User[]>();
  private accountService = inject(AccountServiceService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register(){
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => console.error(error)
      
    })
    console.log(this.creds);

  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }
}
