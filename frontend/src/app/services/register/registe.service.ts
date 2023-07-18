import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import AddUser from '../../mutations/addUser.mutation';
import { SnackbarService } from '../snackbar/snackbar.service';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apollo: Apollo, private router: Router,private snackbar:SnackbarService) {}

  addUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: string,
    gender: string,
    address: string,
    mobile: string
  ): void {
    this.apollo
      .mutate<{ registerUser: User }>({
        mutation: AddUser,
        variables: {
          firstName,
          lastName,
          email,
          password,
          birthDate,
          gender,
          address,
          mobile,
        },
      })

      .subscribe((result) => {
        if (result) {
          this.snackbar.showSnackBar("Now you can Login","close","success")
          this.router.navigate(["/"]);
        }
      });
  }
}
