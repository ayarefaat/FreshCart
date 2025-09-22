import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private _formBuilder:FormBuilder,private _authService:AuthService,private _router:Router,private _sharedService:SharedService){}
  token!:string;
  Form: FormGroup = this._formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]]
  });
  reset(){
    this._authService.resetPassword(this.Form.value).subscribe({
      next:(res)=>{
        this.token=res.token
        console.log(this.token);
        this._sharedService.login(this.token);
        this._router.navigate(['/home']);
      }
    })
  }
}
