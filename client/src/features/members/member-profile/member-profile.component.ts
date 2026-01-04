import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { editableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastServiceService } from '../../../core/services/toast-service.service';
import { AccountServiceService } from '../../../core/services/account-service.service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.css'
})
export class MemberProfileComponent implements OnInit, OnDestroy{
 
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent){
    if (this.editForm?.dirty){
      $event.preventDefault();
    }
  }
  private accountService = inject(AccountServiceService);
  protected memberService = inject(MemberServiceService);
  private toast = inject(ToastServiceService);
  protected editableMember: editableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''

  }

  ngOnInit(): void {
    this.editableMember = {
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',

    }
  }

  updateProfile(){
    if(!this.memberService.member()) return;
    const updatedMember = {...this.memberService.member(), ...this.editableMember}
    console.log(updatedMember);
    this.memberService.updateMember(this.editableMember).subscribe({
        next: () => {
          const currentUser = this.accountService.currentUser();
          if(currentUser && updatedMember.displayName !== currentUser?.displayName){
            currentUser.displayName = updatedMember.displayName
            this.accountService.setCurrentUser(currentUser)
          }
          this.toast.success("profile updated successfully");
          this.memberService.editMode.set(false);
          this.memberService.member.set(updatedMember as Member);
          this.editForm?.reset(updatedMember);
        }
    })
  }

   ngOnDestroy(): void {
    if(this.memberService.editMode()){
      this.memberService.editMode.set(false);
    }
  }
}
