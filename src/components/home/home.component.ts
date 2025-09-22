import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { forkJoin, Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, FormsModule, SearchPipe, NgClass, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private _productService:ProductsService,
    private _categoriesService:CategoriesService,
    private _cartService:CartService,private _wishListService:WishlistService,
    private _toaster:ToastrService){}

  productData!:IProduct[];
  wishListData!:IProduct[];
  categoryData!:ICategory[];
  productSub!:Subscription;
  catSub!:Subscription;
  search:string="";
  favoriteItemID!:string;
  wishListItemsIDs!:string[];
  isProductAdded:Boolean=false;
  
  categoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100:{
        items:5
      }
    },
    nav: true
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items:1,
    navText: ['', ''],
    nav: true
  }


  ngOnInit(){
    forkJoin([
      this._productService.getAllProducts(1),
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
  //  this.productSub= this._productService.getAllProducts().subscribe({
  //     next: (res) => {
  //       this.productData = res.data.slice(0,20);
  //       console.log(this.productData)
  //     },
  //     error:(err)=>{console.log(err)}
  //   });
    this.catSub=this._categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryData=res.data;
        console.log(this.categoryData)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  };
  addToWishList(productId:any,index:any){
    this._wishListService.addToWishList(productId).subscribe({
      next:(res)=>{
        this.wishListItemsIDs=res.data;
        this._wishListService.wishListCounter.next(res.data.length);
        console.log(this.wishListItemsIDs);
        
        this.wishListItemsIDs.filter((currentID:any)=>{
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
    })
  }

  addToCart(id:any){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._cartService.cartCounter.next(res.numOfCartItems)
        // console.log(res.numOfCartItems)
        this._toaster.success(res.message,'Fresh Cart',{closeButton:true})
      }
    })
  }
  ngOnDestroy(){
    this.productSub?.unsubscribe();
    this.catSub?.unsubscribe()
  }

}
