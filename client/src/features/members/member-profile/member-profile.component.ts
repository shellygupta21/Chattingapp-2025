import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { editableMember, member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastServiceService } from '../../../core/services/toast-service.service';

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
  protected memberService = inject(MemberServiceService);
  private toast = inject(ToastServiceService);
  private route = inject(ActivatedRoute);
  protected  member = signal<member | undefined>(undefined);
  protected editableMember: editableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''

  }

  ngOnInit(): void {
    this.route.parent?.data.subscribe(data =>{
      this.member.set(data['member']);
    })

    this.editableMember = {
      displayName: this.member()?.displayName || '',
      description: this.member()?.description || '',
      city: this.member()?.city || '',
      country: this.member()?.country || '',

    }
  }

  updateProfile(){
    if(!this.member()) return;
    const updatedMember = {...this.member(), ...this.editableMember}
    console.log(updatedMember);
    this.memberService.updateMember(this.editableMember).subscribe({
        next: () => {
          this.toast.success("profile updated successfully");
          this.memberService.editMode.set(false);
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
