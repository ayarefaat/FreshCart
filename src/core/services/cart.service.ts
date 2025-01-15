import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartCounter:BehaviorSubject<number>= new BehaviorSubject(0)
clientToken:any={token:this._sharedService.getToken()}
  constructor(private _httpClient:HttpClient,private _sharedService:SharedService) { }
  getLoggedUserCart():Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/cart`,{headers:this.clientToken})
  };
  addToCart(id:string):Observable<any>{
    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/cart`,{productId:id},{headers:this.clientToken});
  };
  removeItem(id:string):Observable<any>{
    return this._httpClient.delete(`${enviroment.baseUrl}/api/v1/cart/${id}`,{headers:this.clientToken})
  };
  updateQuantity(id:string,count:number):Observable<any>{
    return this._httpClient.put(`${enviroment.baseUrl}/api/v1/cart/${id}`,{count:count},{headers:this.clientToken})
  };
  clearCart():Observable<any>{
    return this._httpClient.delete(`${enviroment.baseUrl}/api/v1/cart`,{headers:this.clientToken})
  };
}
