import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartItems } from '../interfaces/Cartitems';

@Injectable({
  providedIn: 'root'
})
export class CartServiveService {


  constructor(private http: HttpClient) {}


  private apiUrl="assets/data/cart.json"

  getProducts(): Observable<{ products: cartItems[] }> {
    return this.http.get<{ products: cartItems[] }>(this.apiUrl);
  }
}
