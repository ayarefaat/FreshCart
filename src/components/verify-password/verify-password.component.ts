import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-password.component.html',
  styleUrl: './verify-password.component.css'
})
export class VerifyPasswordComponent {
  constructor(private _authService:AuthService,private _formBuilder:FormBuilder,private _router:Router){}
  Form: FormGroup = this._formBuilder.group({
    resetCode:[null],
  });
  verify(){
    this._authService.verifyPassword(this.Form.value).subscribe({
      next:(res)=>{
        console.log(res.status);
        if(res.status=='Success'){
          this._router.navigate(['/reset-password']);
        }
      },error:(err)=>{
        console.log(err)
      }
    })
  }
}
