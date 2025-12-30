import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberServiceService } from '../../../core/services/member-service.service';
import { ActivatedRoute } from '@angular/router';
import { member, Photo } from '../../../types/member';
import { ImageUploadComponent } from "../../../shared/image-upload/image-upload.component";
import { AccountServiceService } from '../../../core/services/account-service.service';
import { User } from '../../../types/user';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUploadComponent],
  templateUrl: './member-photos.component.html',
  styleUrl: './member-photos.component.css'
})
export class MemberPhotosComponent implements OnInit{
  protected memberService = inject(MemberServiceService);
  private accountService = inject(AccountServiceService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);

  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId){
      this.memberService.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
      })
    }  }

    onUploadImage(file: File){
      this.loading.set(true);
      this.memberService.uploadPhoto(file).subscribe({
        next: photo => {
          this.memberService.editMode.set(false);
          this.loading.set(false);
          this.photos.update(photos => [...photos, photo])
        },
        error: error => {
          console.log('Error uploading image ', error);
          this.loading.set(false);
          
        }
      })
    }

    setMainPhoto(photo: Photo){
      this.memberService.setMainPhoto(photo).subscribe({
        next: () => {
          const currentUser = this.accountService.currentUser();
          if(currentUser) currentUser.imageUrl = photo.url;
          this.accountService.setCurrentUser(currentUser as User);
          this.memberService.member.update(member => ({
            ...member,
            imageUrl: photo.url
          }) as Member)
        }
      })
    }

}
