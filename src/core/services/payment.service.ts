import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _httpClient:HttpClient,private _sharedService:SharedService) { }
  windowHref=window.location.href
  url!:any
  // clientToken:any={token:this._sharedService.getToken()}
  checkOutSession(cartId:string,body:any):Observable<any>{
    if(this.windowHref.includes('local')){
      this.url="http://localhost:4200"
    }else{
      this.url="https://ayarefaat.github.io/FreshCart"
    }
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.url}`,
      {"shippingAddress":body}
    )
  }
  cashPayment(cartId:string,body:any):Observable<any>{
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/orders/${cartId}`,body)
  }
  getUserOrders(userID:string):Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/orders/user/${userID}`
    )
  }
}
