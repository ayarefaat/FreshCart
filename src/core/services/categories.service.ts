import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _httpClient:HttpClient) { }
  getAllCategories():Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/categories`)
  };
  getSubCategoriesOnCategory(id:string):Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/categories/${id}/subcategories`)
  };
  getSpecificSubCategory(id:string):Observable<any>{
    return this._httpClient.get(`${enviroment.baseUrl}/api/v1/subcategories/${id}`)
  };
}
