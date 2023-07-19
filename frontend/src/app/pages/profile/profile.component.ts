import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { User } from 'src/app/models/user.model';
import PROFILE from 'src/app/queries/profile.query';
import { UpdateComponent } from '../update/update.component';
import { Router } from '@angular/router';
import UserSubscription from 'src/app/subscription/updateUser.subscription';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnChanges {
  imageSource = '../../../../assets/image/logo.png';
  user: User | undefined;
  loading: boolean = false;
  userImageBase64: Uint8Array | null = null;
  userImageBlobUrl: SafeUrl | null = null;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.getUser();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('MY CHANGES', changes);
  }

  getUser() {
    this.apollo
      .query<{ profile: User }>({ query: PROFILE })
      .subscribe(({ data, loading }) => {
        if (loading === true) {
          console.log('loading.........................');
        } else {
          console.log('User Profile', data);
          this.user = data.profile;

          if (data.profile.user_image) {
            // this.userImageBase64 = data.profile.user_image;
            // this.userImageBase64=this.base64ToUint8Array(data.profile.user_image.toString());
            console.log('USER IMAGE', this.userImageBlobUrl);
            this.convertToBlob(data.profile.user_image.toString())

          }
         
        }
      });
  }

  private base64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  convertToDataUrl(array: Uint8Array): SafeUrl {
    const base64String = btoa(String.fromCharCode(...array));
    const mimeType = 'image/*'; // Adjust the MIME type based on your image format
    const dataUrl = `data:${mimeType};base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
  }

  base64Encode(array: Uint8Array): string {
    let binaryString = '';
    const bytes = new Uint8Array(array);
    const length = bytes.byteLength;

    for (let i = 0; i < length; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }

    return btoa(binaryString);
  }

  convertToBlob(base64String: string): void {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Change the type if necessary
    this.userImageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
  }
  update(id: string) {
    console.log('User Id', id);
    this.router.navigate(['/dashboard/update', id]);
  }
}
