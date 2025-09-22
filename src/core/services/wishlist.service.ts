import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishListCounter:BehaviorSubject<number>= new BehaviorSubject(0)
  
  // clientToken:any={token:this._sharedService.getToken()}
  constructor(private _httpClient: HttpClient, private _sharedService: SharedService) { }
  
  addToWishList(body: any): Observable<any> {

    return this._httpClient.post(`${enviroment.baseUrl}/api/v1/wishlist`, {productId:body});
  }
  displayWishList(): Observable<any> {

    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/wishlist`);
  }
  removeWishList(id:any):Observable<any>{
    return this._httpClient.delete(`${enviroment.baseUrl}/api/v1/wishlist/${id}`);
  }
}
