import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient:HttpClient) { }
  registerUSer(userData:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/signup`,userData)
  };
  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/signin`,userData)
  };
  updateUser(userData:object):Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/users/updateMe`,userData)
  };

  forgetPassword(userData:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/forgotPasswords`,userData)
  };
  verifyPassword(code:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  };
  resetPassword(code:object):Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/api/v1/auth/resetPassword`,code)
  };
  verifyToken():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}/api/v1/auth/verifyToken`)
  };

}
