import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private _formBuilder:FormBuilder,private _authService:AuthService,private _router:Router){}
  Form: FormGroup = this._formBuilder.group({
    email:[null,[Validators.required,Validators.email]],
  });
  verify(){
    this._authService.forgetPassword(this.Form.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._router.navigate(['/verify-password']);
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
