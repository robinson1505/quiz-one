import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloError } from '@apollo/client/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { User } from '../../models/user.model';
import Login from '../../mutations/addUser.mutation';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import AddUser from '../../mutations/addUser.mutation';
// import { SnackbarService } from "../snackbar/snackBar.service";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apollo: Apollo) {}

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
          console.log('ADDED USER ', result.data?.registerUser);
          // const user = result.data?.registerUser;
        }
      });
  }
}
