import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age.pipe';
import { AccountServiceService } from '../../../core/services/account-service.service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.component.html',
  styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnInit{
  // private memberService = inject(MemberServiceService);
  private route = inject(ActivatedRoute);
  protected memberService = inject(MemberServiceService);
  private accountservice = inject(AccountServiceService);
  private router = inject(Router);
  protected title = signal<string | undefined>('Profile');
  protected isCurrentUser = computed(() => {
    return this.accountservice.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

  ngOnInit(): void {
      this.title.set(this.route.firstChild?.snapshot?.title);

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe({
        next: () => {
          this.title.set(this.route.firstChild?.snapshot?.title)
        }
      })
  }

  // loadMember() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (!id) return;
  //   return this.memberService.getMember(id);

  // }
}
