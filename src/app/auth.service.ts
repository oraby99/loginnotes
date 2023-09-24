import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseURL="https://routeegypt.herokuapp.com/"
  baseURL="  http://sag.almostafabure.com/api/"

  constructor(private _HttpClient:HttpClient) { }
  signUp(data: any): Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'handle-register',data)
  }
  signIn(data: any):Observable<any>
  {

  return  this._HttpClient.post(this.baseURL+'handle-login',data)
  }
  signOut(data: any):Observable<any>
  {

   return this._HttpClient.post(this.baseURL+'logout',data)
  }
  isLoggedIn()
  {
  return !!localStorage.getItem('TOKEN')
  }
}
