import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  constructor() { }
 decodedInfo:any;
 userID!:string;
  login(token:string){
    sessionStorage.setItem("token",`${token}`);
  }
  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem('userID')
  }
  getToken(){
   return sessionStorage.getItem("token");
  }
  saveDecodedUser(){
    if(sessionStorage.getItem('token')!==null){
      this.decodedInfo=jwtDecode(this.getToken()!);
      this.userID=this.decodedInfo.id;
      sessionStorage.setItem('userID',this.decodedInfo.id)
      // console.log(this.userID)
    }
  }
  getUserID(){
    return sessionStorage.getItem('userID');
  }
}
