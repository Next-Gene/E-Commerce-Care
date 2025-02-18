import { registerUser } from './../projects/auth-api/src/lib/interface/register';
import { AuthENDPOINT } from './../projects/auth-api/src/lib/enums/AuthAPI.endpoint';
import {jwtDecode} from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthLayOutService {
private _router = inject(Router)
  constructor(private _HttpClient:HttpClient) {

  }
signup=(data :any):Observable<registerUser> =>{
 return this._HttpClient.post<registerUser>(AuthENDPOINT.REGISER, data)
}
signin=(data :any):Observable<registerUser> =>{
  return this._HttpClient.post<registerUser>(AuthENDPOINT.LOGIN, data)
 }
 saveData=()=>{
  let token=localStorage.getItem('token')
  if(token){
    try{
      let decode=jwtDecode(token);
console.log(decode);
    }catch{

      localStorage.clear();

    }
  }
 
 }
}
