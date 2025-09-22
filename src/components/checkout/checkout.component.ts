import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { NgClass } from '@angular/common';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private _formBuilder:FormBuilder,
    private _activatedRoute:ActivatedRoute,
    private _paymentService:PaymentService,
    private _cartService:CartService,
    private _router:Router
  ){}
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
  payVisa(){
    this._paymentService.checkOutSession(this.cartId,this.shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.open(res.session.url,'_self')
      }
    })
    console.log(this.shippingAddress.value)
  };
  payCash(){
    this._paymentService.cashPayment(this.cartId,this.shippingAddress.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._router.navigate(['/allorders']);
        this._cartService.cartCounter.next(0)
      }
    })
  }
}
