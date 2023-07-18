import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { User } from 'src/app/models/user.model';
import PROFILE from 'src/app/queries/profile.query';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageSource = '../../../../assets/image/logo.png';
  user: User | undefined;

  constructor(private apollo: Apollo, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUser();
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
        }
      });
  }
  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateComponent, {
      // width: '75%',
      // height: '100%',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the result if the dialog was closed with a result
        console.log('Dialog result:', result);
        // Perform any necessary actions based on the result
      } else {
        // Handle the case when the dialog was closed without a result
        console.log('Dialog closed without a result');
        // Perform any necessary actions or fallback logic
      }
    });
  }
}
