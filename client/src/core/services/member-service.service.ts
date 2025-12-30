import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { editableMember, member, Photo } from '../../types/member';
import { AccountServiceService } from './account-service.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  private http = inject(HttpClient);
  // private accountService = inject(AccountServiceService);
  private baseUrl = environment.apiUrl;
  editMode = signal(false);
  member = signal<member | null>(null);

  getMembers(){
    return this.http.get<member[]>(this.baseUrl + 'members');
  }

  getMember(id: string){
    return this.http.get<member>(this.baseUrl +  'members/' + id).pipe(
      tap(member => {
        this.member.set(member)
      })
    )
  }

  getMemberPhotos(id: string){
    return this.http.get<Photo[]>(this.baseUrl + 'members/' + id + '/photos');

    
  }

  updateMember(member: editableMember){
    return this.http.put(this.baseUrl + 'members', member);
  }
  //commenting this as we are ging to take care of authorization inside interceptor now
  // private getHttpOptions(){
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token
  //     })

  //   }
  // }

  uploadPhoto(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photo>(this.baseUrl + 'members/add-photo', formData);
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'member/set-main-photo/' + photo.id, {});
  }
}
