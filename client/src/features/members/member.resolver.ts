import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { MemberServiceService } from '../../core/services/member-service.service';
import { EMPTY } from 'rxjs';
import { member } from '../../types/member';

export const memberResolver: ResolveFn<member> = (route) => {
  const memberService = inject(MemberServiceService);
  const router = inject(Router);
  const memberId = route.paramMap.get('id');

  if(!memberId){
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(memberId);
};
