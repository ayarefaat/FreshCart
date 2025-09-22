import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _httpClient:HttpClient) { }
   addAddress(address:object):Observable<any>{
      return this._httpClient.post(`${enviroment.baseUrl}/api/v1/addresses`,address)
    };
   getUserAddresses():Observable<any>{
      return this._httpClient.get(`${enviroment.baseUrl}/api/v1/addresses`)
    };
   removeAddress(id:string):Observable<any>{
      return this._httpClient.delete(`${enviroment.baseUrl}/api/v1/addresses/${id}`)
    };
}
