import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NotifierComponent } from './notifier/notifier.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateComponent } from './update/update.component';

const pageComponents = [
  LoginComponent,
  SignupComponent,
  ProfileComponent,
  DashboardComponent,
];
@NgModule({
  declarations: [pageComponents, NotifierComponent, ProfileComponent, UserListComponent, UpdateComponent],
  imports: [CommonModule,MaterialModule,FormsModule,RouterModule ],
  exports: [pageComponents],
})
export class PagesModule {}
