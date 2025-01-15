import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  constructor(private _activatedRoute:ActivatedRoute){}
  orderDetails!:any;
  params!:any
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.orderDetails=params.get('items');
      }
    });
    this.getOrderDetails()
  }
  getOrderDetails(){
    console.log(JSON.parse(this.orderDetails))
    return JSON.parse(this.orderDetails);
  }
}
