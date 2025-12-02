import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age.pipe';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, AgePipe],
  templateUrl: './member-detailed.component.html',
  styleUrl: './member-detailed.component.css'
})
export class MemberDetailedComponent implements OnInit{
  // private memberService = inject(MemberServiceService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected member = signal<member | undefined>(undefined);
  protected title = signal<string | undefined>('Profile');

  ngOnInit(): void {
      
      this.title.set(this.route.firstChild?.snapshot?.title);
      this.route.data.subscribe({
        next: data => this.member.set(data['member'])
      })
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
