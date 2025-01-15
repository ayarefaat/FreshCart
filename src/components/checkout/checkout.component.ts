import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private _formBuilder:FormBuilder,private _activatedRoute:ActivatedRoute,private _paymentService:PaymentService){}
  shippingAddress:FormGroup=this._formBuilder.group({
    details:[null,[Validators.required,Validators.minLength(20)]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:[null,[Validators.required,Validators.minLength(3)]]
  });
  cartId!:any;
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartId= params.get('id');
       console.log(this.cartId)
      }
    })
  }
  payCart(){
    this._paymentService.checkOutSession(this.cartId,this.shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.open(res.session.url,'_self')
      },error:(err)=>{
        console.log(err)
      }
    })
    console.log(this.shippingAddress.value)
  }
}
