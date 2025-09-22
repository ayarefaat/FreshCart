import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { LoaderComponent } from '../loader/loader.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule,UpperCasePipe,CurrencyPipe,LoaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private _activatedRoute:ActivatedRoute,
    private _productService:ProductsService,private _cartService:CartService,private _toaster:ToastrService){}
    productId!:any;
    productDetails!:IProduct;
    productSlider: OwlOptions = {
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
  ngOnInit(){
    this._activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId=params.get('id');
        console.log(this.productId);
      }
    });
    

    this._productService.getProductDetails(this.productId).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productDetails=res.data
      }
  })
   
  };
  addToCart(id:any){
    this._cartService.addToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._cartService.cartCounter.next(res.numOfCartItems);
        this._toaster.success(res.message,'FreshCart',{closeButton:true,timeOut:1000})
      }
    })
  }
}
