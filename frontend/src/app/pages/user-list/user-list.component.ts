import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import PROFILE from 'src/app/queries/profile.query';
import GET_USERS from 'src/app/queries/users.query';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  isAdmin: boolean = false;
  user: User | undefined;
  allUsers: User[] = [];

  constructor(private apollo: Apollo) {}
  ngOnInit(): void {
    this.getAllUsers();
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
          this.isAdmin = this.user?.role?.role_name === 'admin';
        }
      });
  }
  getAllUsers() {
    this.apollo
      .watchQuery<{ getUsers: User[] }>({ query: GET_USERS })
      .valueChanges.pipe(
        map((result) => {
          console.log('All Users', result.data.getUsers);
          this.allUsers = result.data.getUsers;
        })
      )
      .subscribe();
  }
}
