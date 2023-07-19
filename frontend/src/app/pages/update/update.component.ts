import { Component,  OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { User } from 'src/app/models/user.model';
import UpdateUser from 'src/app/mutations/update.mutation';
import PROFILE from 'src/app/queries/profile.query';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';





@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit{
  updateForm!: FormGroup;
  user!: User;
  genders: string[] = ['male', 'female'];
  hidePassword: boolean = true;
  isDirty: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router,
   
  ) {
    this.updateForm = this.formBuilder.group({
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

  ngOnInit(): void {
    this.getUser();
  }
  
   
  getUser() {
    this.apollo
      .query<{ profile: User }>({ query: PROFILE })
      .subscribe(({ data, loading }) => {
        if (loading === true) {
          console.log('loading.........................');
        } else {
          this.updateForm.patchValue({
            firstName: data.profile.first_name,
            lastName: data.profile.last_name,
            email: data.profile.email,
            password: data.profile.password,
            birthDate: data.profile.birth_date,
            gender: data.profile.gender,
            address: data.profile.address,
            mobile: data.profile.mobile,
          });
        }
      });
  }
  async updateProfile() {
    this.route.params.subscribe(async (params) => {
      const formData = this.updateForm.value;

      let id = params['id'];

      this.apollo
        .mutate<any>({
          mutation: UpdateUser,
          variables: {
            data: {
              id,
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              password: formData.password,
              birth_date: formData.birthDate,
              gender: formData.gender,
              address: formData.address,
              mobile: formData.mobile,
            },
          },
        })
        .subscribe((result) => {
          console.log('UPDATE USER', result);
          if (result) {
            console.log('UPDATE USER', result);
            this.snackbarService.showSnackBar(
              'sucessfull update',
              'close',
              'success'
            );
            this.router.navigate(['/dashboard/profile']);
          }
        });
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
