import { Component, inject } from '@angular/core';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { member } from '../../../types/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {
  private memberService = inject(MemberServiceService);
  protected members$: Observable<member[]>;

  constructor() {
    this.members$ = this.memberService.getMembers();
  }
}
