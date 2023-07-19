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
import { SnackbarService } from '../snackbar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfimationDialogComponent } from 'src/app/pages/confimation-dialog/confimation-dialog.component';
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

  constructor(
    private apollo: Apollo,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {
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
          this.snackbarService.showSnackBar(
            'Login successfully!',
            'OK',
            'success'
          );
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
      .pipe(
        catchError((error) => {
          if (error.graphQLErrors) {
            this.snackbarService.showSnackBar(
              'Wrong Credential',
              'close',
              'error'
            );
          }
          return of(null);
        })
      )

      .subscribe((result) => {
        if (result) {
          const token = result.data?.login;
          localStorage.setItem('token', JSON.stringify(token));
          this.isAuthenticated$.next(true);

          window.location.href = '/dashboard';
        }
      });
  }
  private openLogoutConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      width: '350px',
    });

    return dialogRef.afterClosed();
  }

  logout() {
    this.openLogoutConfirmationDialog().subscribe((confirmed) => {
      if (confirmed) {
        localStorage.removeItem('token');
        this.isAuthenticated$.next(false);
        window.location.href = '/';
      }
    });
  }
  isLoggedIn(): Observable<boolean> {
    if (this.isAuthenticated$.hasError === true) {
      this.logout();
    }

    return this.isAuthenticated$.asObservable();
  }
}
