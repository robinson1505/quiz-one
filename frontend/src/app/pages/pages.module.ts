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

const pageComponents = [
  LoginComponent,
  SignupComponent,
  ProfileComponent,
  DashboardComponent,
];
@NgModule({
  declarations: [pageComponents, NotifierComponent],
  imports: [CommonModule,MaterialModule,FormsModule,RouterModule ],
  exports: [pageComponents],
})
export class PagesModule {}
