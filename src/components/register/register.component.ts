import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { SharedService } from '../../core/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _authService:AuthService,
              private _router:Router,
              private _formBuilder:FormBuilder,
              private _sharedService:SharedService,
              private _toaster:ToastrService){}

  isLoading:Boolean=false;
  resText!:string;
  intervalId:any;
  registerSub!:Subscription
  
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.confirmPasword);

  confirmPasword(g:AbstractControl){
    // ?means null safety 3shan lw g.get('password')==null .. msh ht3rf tegb value
    if(g.get('password')?.value===g.get('rePassword')?.value){
      return null;
    }else{
      return{missMatch:true}
    }
  }
  registerUser():void{
    if(this.registerForm.valid){
      console.log(this.registerForm);
      this.isLoading=true;
      this.registerSub= this._authService.registerUSer(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._toaster.success("Registered successfully", "FreshCart",{closeButton:true,timeOut:1000})
          this.isLoading=false;
          this.intervalId=setInterval(()=>{
            this._router.navigate(['/login'])
          },2000)
          
        },
        error:(err)=>{
          console.log(err);
          this.isLoading=false;
          this.resText=err.error.message;
        }
      })
    }else{
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(){
    clearInterval(this.intervalId);
    this.registerSub?.unsubscribe()
  }
}
