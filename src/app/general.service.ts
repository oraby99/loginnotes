import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseURL="  http://sag.almostafabure.com/api/"
  token:any

  constructor(private _HttpClient:HttpClient)
  {
    this.token = localStorage.getItem('TOKEN');
  }
  getAllCity():Observable<any>
  {
     return this._HttpClient.get(this.baseURL+'city' )
  }
  getAllrelative():Observable<any>
  {
     return this._HttpClient.get(this.baseURL+'relative' )
  }

}
