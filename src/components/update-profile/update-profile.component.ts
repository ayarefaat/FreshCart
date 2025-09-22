import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../core/services/shared.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  constructor(private _activatedRoute:ActivatedRoute,
    private _formBuilder:FormBuilder,
    private _authService:AuthService,
    private _toaster:ToastrService,
    private _sharedService:SharedService,
    private _router:Router){}
  userData!:any;
  updateForm!:FormGroup;
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.userData=JSON.parse(params.get('data')!)
        console.log(this.userData);
        this.updateUser()
      }
    })
  }
  updateUser(){
    this.updateForm= this._formBuilder.group({
      name:[this.userData.name,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email:[this.userData.email,[Validators.required,Validators.email]],
      phone:[this.userData.phone||null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
      })
  }
  update(){
    console.log(this.updateForm.value);
    this._authService.updateUser(this.updateForm.value).subscribe({
      
      next:(res)=>{
        console.log(res);
        this._toaster.success(res.message,'FreshCart' ,{closeButton:true,timeOut:1000});
        this._sharedService.saveUserData(this.updateForm.value)
        this._router.navigate(['profile'])

      }
    })
  }
}
