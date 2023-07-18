import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthService } from './services/authentication/auth.service';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate: [AuthService],
  }
  ,{
    path:"register",
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
