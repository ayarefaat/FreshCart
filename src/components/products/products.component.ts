import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { forkJoin, Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,NgClass,FormsModule,LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private _productsService:ProductsService,
    private _cartService:CartService,
    private _wishListService:WishlistService,
    private _toaster:ToastrService){}
  productSub!:Subscription;
  productData!:IProduct[];
  productDataPage2!:IProduct[];
  isLoaded:Boolean=false;
  wishListData!:IProduct[]
  ngOnInit(){
    forkJoin([
         this._productsService.getAllProducts(1),
         this._wishListService.displayWishList()
       ]).subscribe({
         next:(res)=>{
           this.productData=res[0].data.slice(0,20),
           this.wishListData=res[1].data;
           this.productData.forEach((element)=>{
             for(let i=0;i < this.wishListData.length;i++){
               if(element._id===this.wishListData[i]._id){
                 element.isAdded=true
               }
             }
           });
           console.log(this.productData,this.wishListData)
         }
       })
  }
  getSecondPageOfProduct(){
    this.isLoaded=true
    this._productsService.getAllProducts(2).subscribe({
      next:(res)=>{
        this.productDataPage2=res.data;
        console.log(res)
      },error:(err)=>{
        console.log(err)
      }
    })
  }
  addToWishList(productId:any,index:any){
    this._wishListService.addToWishList(productId).subscribe({
      next:(res)=>{
        this.wishListData=res.data;
        this._wishListService.wishListCounter.next(res.data.length);
        console.log(this.wishListData);
        
        this.wishListData.filter((currentID:any)=>{
          if(currentID===this.productData[index]._id){
            this.productData[index].isAdded=!this.productData[index].isAdded;
            //check if the heart is red and if not remove item
            if(!this.productData[index].isAdded){
              this._wishListService.removeWishList(productId).subscribe({
                next:(res)=>{
                  console.log(res);
                  this._toaster.warning(res.message,'FreshCart',{closeButton:true,timeOut:1000});
                  this._wishListService.wishListCounter.next(res.data.length)
                  
                }
              })
            }else{
              this._toaster.success(res.message,'FreshCart',{closeButton:true,timeOut:1000});
            }
          }
        });
          
      }
      ,
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addToCart(id:any){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._toaster.success(res.message,'FreshCart',{closeButton:true,timeOut:1000});
        this._cartService.cartCounter.next(res.numOfCartItems)
      },error:(err)=>{
        console.log(err)
      }
    })
    console.log('add to cart clicked');
  }
}
