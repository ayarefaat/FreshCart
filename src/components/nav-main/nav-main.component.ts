import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SharedService } from '../../core/services/shared.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit {
  constructor(private _router:Router,
    private _sharedService:SharedService,
    private _cartService:CartService,
    private _wishListService:WishlistService){}
  numOfCartItems!:number;
  numOfWishListItems!:number;
  cartSub!:Subscription;
  wishSub!:Subscription
  ngOnInit(){
    this._cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.numOfCartItems=res.numOfCartItems
      },error:(err)=>{
        console.log(err)
      }
    })
   this.cartSub= this._cartService.cartCounter.subscribe({
      next:(counter)=>{
        this.numOfCartItems=counter;
      }
    });

    this._wishListService.displayWishList().subscribe({
      next:(res)=>{
        console.log(res);
        this.numOfWishListItems=res.data.length
      },error:(err)=>{
        console.log(err)
      }
    });
    this.wishSub= this._wishListService.wishListCounter.subscribe({
      next:(counter)=>{
        this.numOfWishListItems=counter
      }
    })
  }
  logout(){
    this._sharedService.logout()
    // sessionStorage.removeItem('token');
    this._router.navigate(['/login']);
  };
  ngOnDestroy(){
    this.cartSub.unsubscribe();
    this.wishSub.unsubscribe()
  }
}
