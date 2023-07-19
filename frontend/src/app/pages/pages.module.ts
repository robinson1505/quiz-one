import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifierComponent } from './notifier/notifier.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateComponent } from './update/update.component';
import { ConfimationDialogComponent } from './confimation-dialog/confimation-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SaveConfirmationDialogComponent } from './save-confirmation/save-confirmation.component';
import { CanDeactivateGuard } from '../guards/deactivate/can-deactivate.guard';

const pageComponents = [
  LoginComponent,
  SignupComponent,
  ProfileComponent,
  DashboardComponent,
  SaveConfirmationDialogComponent,
  NotifierComponent,
  ProfileComponent,
  UserListComponent,
  UpdateComponent,
  ConfimationDialogComponent,
  PageNotFoundComponent,
];
@NgModule({
  declarations: [pageComponents],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    
  ],
  exports: [pageComponents],
})
export class PagesModule {}
