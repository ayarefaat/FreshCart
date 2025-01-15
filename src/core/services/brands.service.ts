import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient:HttpClient) { }
  getAllBrands():Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/brands`)
  }
  getSpecificBrand(id:any):Observable<any> {
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/brands/${id}`)
  }
}
