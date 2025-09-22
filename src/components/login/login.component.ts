import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../../core/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoading:Boolean=false;
  intervalId:any;
  loginSub!:Subscription;
  constructor(private _formBuilder:FormBuilder,
              private _authService:AuthService,
              private _router:Router,
              private _sharedService:SharedService,
              private _toaster:ToastrService){}
  loginForm: FormGroup = this._formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  loginUser(){
    if(this.loginForm.valid)
      {console.log(this.loginForm);
        this.isLoading=true
       this.loginSub= this._authService.loginUser(this.loginForm.value).subscribe({
          next:(res)=>{
            console.log(res);
            this._toaster.success("Logged in successfully", "FreshCart",{closeButton:true,timeOut:1000})
            this.isLoading=false;
            this._sharedService.login(res.token);
            this._sharedService.saveDecodedUser();
            this._sharedService.saveUserData(res.user)
            // sessionStorage.setItem('token',res.token)
             this.intervalId=setInterval(()=>{
              this._router.navigate(['/home'])
            },2000)
          }
        })
      }else{
        this.loginForm.markAllAsTouched()
      }
  }
  forget(){
    this._router.navigate(['/forget-password'])
  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
    this.loginSub?.unsubscribe()
  }
}
