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
  clientToken:any={token:this._sharedService.getToken()}
  checkOutSession(cartId:string,body:any):Observable<any>{
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroment.url}`,
      {"shippingAddress":body},{headers:this.clientToken}
    )
  }
  getUserOrders(userID:string):Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/orders/user/${userID}`,{headers:this.clientToken}
    )
  }
}
