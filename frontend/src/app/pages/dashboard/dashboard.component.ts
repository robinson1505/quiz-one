import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import PROFILE from 'src/app/queries/profile.query';
import GET_USERS from 'src/app/queries/users.query';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  sideBarOpen = true;
  user: User | undefined;

  imageSource = '../../../../assets/image/logo.png';
  constructor(private apollo: Apollo, private authService: AuthService) {}
  sideBarTogger() {
    console.log(this.sideBarOpen);
    this.sideBarOpen = !this.sideBarOpen;
  }

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

  logout() {
    this.authService.logout();
  }
}
