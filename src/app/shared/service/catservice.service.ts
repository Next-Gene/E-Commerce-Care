import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatserviceService {
  private jsonUrl = 'assets/data.json';

  getCategories(): Observable<any[]> {
    return from(fetch(this.jsonUrl).then(res => res.json())); 
  }
}
