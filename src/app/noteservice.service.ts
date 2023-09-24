import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {
  baseURL="  http://sag.almostafabure.com/api/"
  token:any

  constructor(private _HttpClient:HttpClient)
  {
    this.token = localStorage.getItem('TOKEN');
  }


  getAllglassess():Observable<any>
  {
     return this._HttpClient.get(this.baseURL+'allglassess?access_token=' + this.token)
  }

  addNote(data:any):Observable<any>
  {
     return this._HttpClient.post(this.baseURL+'addNote',data)
  }
  updateNote(data:any):Observable<any>
  {
     return this._HttpClient.put(this.baseURL+'updateNote',data)
  }


  deleteNote(data:any):Observable<any>
  {
    let options={
      headers:new HttpHeaders({

      }),
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
     return this._HttpClient.delete(this.baseURL+'deleteNote',options)
  }
}
