import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, LoaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private _cartService:CartService,private _toastr:ToastrService){}
  catSub!:Subscription;
  cartData!:ICart[];
  noOfCartItems!:number;
  totalCartPrice!:number;
  cartID!:string;
  ngOnInit(){
   this.catSub= this._cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.cartData=res.data.products;
        this.cartID=res.cartId;
        console.log(this.cartID)
        this.totalCartPrice=res.data.totalCartPrice;
        this.noOfCartItems=res.numOfCartItems
        console.log(this.cartData)
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  deleteItem(productId:any){
    this._cartService.removeItem(productId).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status=='success'){
          this.cartData=res.data.products;
          //behaviour subject
          this._cartService.cartCounter.next(res.numOfCartItems);

          this.noOfCartItems=res.numOfCartItems;
          this.totalCartPrice=res.data.totalCartPrice;
          console.log(this.totalCartPrice);
          this._toastr.warning("Removed Successfully")
        }
      },error:(err)=>{
        console.log(err)
      }
    })
  };

  clearCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        this._toastr.warning("Cleared Successfully")
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        
        this.cartData.splice(0,this.cartData.length);
        this.noOfCartItems=0;
        this.totalCartPrice=0
      }
    })
  };
  updateQuantity(productId:string,count:number){
    this._cartService.updateQuantity(productId,count).subscribe({
      next:(res)=>{
        console.log(res);
        this.totalCartPrice=res.data.totalCartPrice;
        this.cartData=res.data.products;
        this._toastr.success("Updated Successfully")
      },error(err){
        console.log(err)
      },complete:()=>{
        
      }
    })
  }
  ngOnDestroy(){
    this.catSub.unsubscribe();
  }
}
