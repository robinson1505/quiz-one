import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material/material.module';
import { FormsModule } from "@angular/forms";

const pageComponents = [
  LoginComponent,
  SignupComponent,
  ProfileComponent,
  DashboardComponent,
];
@NgModule({
  declarations: [pageComponents],
  imports: [CommonModule,MaterialModule,FormsModule ],
  exports: [pageComponents],
})
export class PagesModule {}
