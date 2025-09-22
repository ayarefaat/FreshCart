import { Component } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { LoaderComponent } from "../loader/loader.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [LoaderComponent,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  constructor(private _wishlistService:WishlistService,private _toaster:ToastrService,private _cartService:CartService){}
  wishListData!:IProduct[];
  wishListSub!:Subscription
  ngOnInit(){
    this.wishListSub= this._wishlistService.displayWishList().subscribe({
      next:(res)=>{
        this.wishListData=res.data
        console.log(this.wishListData)
      }
    })
  }
  delete(id:any,index:any){
    this._wishlistService.removeWishList(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._toaster.warning(res.message,'FreshCart',{closeButton:true,timeOut:1000});
        this.wishListData.splice(index,1);

        this._wishlistService.wishListCounter.next(res.data.length)
      }
    })
  };
  addToCart(id:string,index:any){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.delete(id,index);
        this._cartService.cartCounter.next(res.numOfCartItems)
        this._toaster.success(res.message,'FreshCart',{closeButton:true,timeOut:1000})
      }
    })
  }
}
