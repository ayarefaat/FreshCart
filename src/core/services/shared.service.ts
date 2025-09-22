import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  constructor() { }
 decodedInfo:any;
 userID!:string;
 userData!:any
  login(token:string){
    localStorage.setItem("token",`${token}`);
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem('userID');
    localStorage.removeItem('userData')
  }
  getToken(){
   return localStorage.getItem("token");
  }
  saveUserData(data:any){
    let userData=JSON.stringify(data)
    localStorage.setItem('userData',userData)
  }
  saveDecodedUser(){
    if(localStorage.getItem('token')!==null){
      this.decodedInfo=jwtDecode(this.getToken()!);
      this.userID=this.decodedInfo.id;
      console.log(this.decodedInfo)
      localStorage.setItem('userID',this.decodedInfo.id)
      // console.log(this.userID)
    }
  }
  getUserID(){
    return localStorage.getItem('userID');
  }
 getUserData(){
  return localStorage.getItem('userData')
 }
}
