import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoServeService } from '../todo-serve.service';
import { custmValidators } from './custm.validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private serve: TodoServeService,private router:Router) { }
  loginError=false

  loginForm = new FormGroup({
    'email': new  FormControl("",[ Validators.required,Validators.email]),
    'password': new  FormControl("",[ Validators.required]),
  });

  loginFn(f){
    console.log(f.value);
    this.serve.userLogin(f.value).subscribe(Response=>
      {
      // console.log(Response);
      alert('sucessfuly logged in')
      this.router.navigate(['/']);
      
    },error=>{
      console.log(error);
      this.loginError=error.error.errors;
      console.log(this.loginError);
      

    })
  }



  registerForm = new FormGroup({
    'username': new  FormControl("",[ Validators.required,]),
    'email': new  FormControl("",[ Validators.required,Validators.email] ),
    'password1': new  FormControl("",[ Validators.required,Validators.minLength(8)]),
    'password': new  FormControl("",[ Validators.required,custmValidators.validpassword]),
  });



  registerFn(d){
    console.log(d.value);
    
    this.serve.userRegister(d.value).subscribe(Response=>{
      console.log(Response);
      alert('sucessfuly registered')
    
      this.router.navigate(['/']);

    },error=>{
      console.log(error);
      // this.registerForm.setErrors({notUnique:true});
      if(error.error.errors.email){
        this.registerForm.get('email').setErrors({notUnique:true})
      }
      if(error.error.errors.username){
        this.registerForm.get('username').setErrors({notUnique:true})
      }
        console.log(this.registerForm);    
      alert('something went weong')
    })
    
  }


  reset(){
    console.log('resetting.........');
    this.registerForm.reset();
    this.loginForm.reset();
    this.loginError=false;
  }

  ngOnInit() {
    if(this.serve.isLoggedIn()){
      this.router.navigate(['/']);
    }
    this.reset() 
  }

}
