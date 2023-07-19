import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { RegisterService } from 'src/app/services/register/registe.service';

import { Role } from 'src/app/models/role.model';
import GET_ROLES from 'src/app/queries/role.query';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  userRole: string = 'user';
  hidePassword: boolean = true;
  genders: string[] = ['male', 'female'];


  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private dialog: MatDialog,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  
  }

 

  addUser() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('MY FORM DATA ', formData);
      this.registerService.addUser(
        formData.firstName,
        formData.lastName,
        formData.email,
   
        formData.password,
        formData.birthDate,
        formData.gender,
        formData.address,
        formData.mobile,
        
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // openSaveConfirmationDialog(): void {
  //   const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
  //     width: '250px',
  //   });

  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       this.addUser();
  //     }
  //   });
  // }

  // canDeactivate(): boolean | Observable<boolean> {
  //   if (this.signupForm.dirty) {
  //     const dialogRef = this.dialog.open(SaveConfirmationDialogComponent, {
  //       width: '250px',
  //     });

  //     return dialogRef.afterClosed();
  //   }

  //   return true;
  // }
}
