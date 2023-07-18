import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register/registe.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  birthDate: string = '';
  gender:string =""
  address: string = '';
  mobile: string = '';
  genders: string[] = ['male', 'female',];
  constructor(private registerService: RegisterService) {}
  addUser() {
    this.registerService.addUser(
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.birthDate,
      this.gender,
      this.address,
      this.mobile
    );
  }
}
