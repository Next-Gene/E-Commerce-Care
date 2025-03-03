import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {
private images="/images.json"
  constructor(private _HttpClient:HttpClient) { 
    
  }
  getimage():Observable<any>{
    return this._HttpClient.get(this.images)
  }
}
