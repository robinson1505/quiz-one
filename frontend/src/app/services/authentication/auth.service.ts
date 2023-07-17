import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloError } from '@apollo/client/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { LoginResult } from '../../models/auth.model';
import Login from '../../mutations/user.mutations';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// import { SnackbarService } from "../snackbar/snackBar.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  graphqlErrors: ApolloError[] = [];
  networkErrors: ApolloError[] = [];
  errorMessage: string = '';

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  static isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  constructor(private apollo: Apollo, private router: Router) {
    if (localStorage.getItem('token')) this.isAuthenticated$.next(true);
    else this.isAuthenticated$.next(false);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isLoggedIn().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }

  login(email: string, password: string): void {
    this.apollo
      .mutate<LoginResult>({
        mutation: Login,
        variables: { email, password },
      })

      .subscribe((result) => {
        if (result) {
          const token = result.data?.login;
          localStorage.setItem('token', JSON.stringify(token));
          this.isAuthenticated$.next(true);
          window.location.href = '/dashboard';
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated$.next(false);
    window.location.href = '/';
  }
  isLoggedIn(): Observable<boolean> {
    console.log('IS LOGIN', this.isAuthenticated$.hasError);
    if (this.isAuthenticated$.hasError === true) {
      this.logout();
    }

    return this.isAuthenticated$.asObservable();
  }
}
