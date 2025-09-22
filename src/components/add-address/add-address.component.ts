import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { IAddress } from '../../core/interfaces/iaddress';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent implements OnInit , OnDestroy {
constructor(private _formBuilder:FormBuilder,
  private _addressService:AddressService,
  private _toaster:ToastrService,
  private _router:Router){}
  timer!:any;
  addresses!:IAddress[];

addressForm:FormGroup=this._formBuilder.group({
  name:[null,[Validators.required]],
  details:[null,[Validators.required,Validators.minLength(20)]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null,[Validators.required,Validators.minLength(3)]]
});
ngOnInit(){
  this._addressService.getUserAddresses().subscribe({
    next:(res)=>{
      this.addresses=res.data;
    }
  })
};
addAddress(){
    this._addressService.addAddress(this.addressForm.value).subscribe({
      next:(res)=>{
        this._toaster.success(res.message,'FreshCart',{closeButton:true,timeOut:1000});
        console.log(res);
       this.timer= setTimeout(()=>{
          this._router.navigate(['/addresses']);
        },1500)
      }
    })
}
ngOnDestroy(){
  clearTimeout(this.timer)
}
}
