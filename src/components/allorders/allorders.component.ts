import { Component } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { SharedService } from '../../core/services/shared.service';
import { IPayment } from '../../core/interfaces/ipayment';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {
  constructor(private _paymentService:PaymentService,private _sharedService:SharedService){}
  userID:any=this._sharedService.getUserID();
  ordersData!:IPayment[];
  ngOnInit(){
    console.log(this.userID)
    this._paymentService.getUserOrders(this.userID).subscribe({
      next:(res)=>{
        this.ordersData=res;
        console.log(this.ordersData);
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  sendOrderDetails(order:any){
    return JSON.stringify(order)
  }
}
