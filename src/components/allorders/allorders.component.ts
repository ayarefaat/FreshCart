import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { SharedService } from '../../core/services/shared.service';
import { IPayment } from '../../core/interfaces/ipayment';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {
  constructor(private _paymentService:PaymentService,private _sharedService:SharedService,private _cartService:CartService){}
  userID:any=this._sharedService.getUserID();
  ordersData!:IPayment[];
  ngOnInit(){
    console.log(this.userID)
    this._paymentService.getUserOrders(this.userID).subscribe({
      next:(res)=>{
        this.ordersData=res;
        console.log(this.ordersData);
        // this._cartService.cartCounter.next(0)
      }
    })
  }
  sendOrderDetails(order:any){
    return JSON.stringify(order)
  }
}
