import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { User } from '../../core/model/object.model';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss',
})
export class SigninSignupComponent {
  // pehla registration form flse rese
  regForm: boolean = false;
  signUpfrom!: FormGroup;
  signInfrom!: FormGroup;

  //registration form mate
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginSignupService
  ) {}

  ngOnInit(): void {
    this.href = this.router.url;
    // if link is sign-up hase toh regform true thai jase else false thai jase
    if (this.href === '/sign-up') {
      this.regForm = true;
    } else if (this.href === '/sign-in') {
      this.regForm = false;
    }
    this.signUpfrom = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.signInfrom = this.formBuilder.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

// validation mate 
  get rf() {
    return this.signUpfrom.controls;
  }

  // on submit par true thai jase
  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpfrom.invalid) {
      return;
    }
    this.user_reg_data = this.signUpfrom.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    };

    //
    this.loginService.userRegister(this.user_dto).subscribe((data) => {
      alert('User Register Successfull');
      this.router.navigateByUrl('/sign-in');
    });
  }

  // if the user_data no role seller hase toh seller par and buyer hase toh buyer par lai jase
  onSubmitSignIn() {
    this.loginService
      .authLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length == 1) {
            if (this.user_data[0].role == 'seller') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigateByUrl('/seller-dashboard');
            } else if (this.user_data[0].role == 'buyer') {
              sessionStorage.setItem('user_session_id', this.user_data[0].id);
              sessionStorage.setItem('role', this.user_data[0].role);
              this.router.navigateByUrl('/buyer-dashboard');
            } else {
              alert('Invalid login details');
            }
          } else {
            alert('Invalid');
          }
          console.log(this.user_data);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
}
