import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{

  signInFormValue:any ={};
  user_data:any;
  constructor(private router:Router, private loginService:LoginSignupService){

  }
  ngOnInit(): void {

  }

  // useremail and password session ma set karavse length check je data response thaje khali ek user par 
  onSubmitSignIn(){
    this.loginService.adminLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data =>{
      this.user_data = data;
      if(this.user_data.length ==1){
        sessionStorage.setItem("user_session_id", this.user_data[0].id);
        sessionStorage.setItem("role", this.user_data[0].role);
        this.router.navigateByUrl('/admin-dashboard');
      }else{
        alert("Invailid Response")
      }
      console.log(this.user_data);
    },error=>{
      console.log(" Error", error)
    })
  }
}