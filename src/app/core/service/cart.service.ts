import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoint } from '../enums/api.endpoints';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartServive {

  constructor(private _HttpClient: HttpClient) {}

  getItems(): Observable<Cart> {
    return this._HttpClient.get<Cart>(`${ApiEndpoint.CART}`);
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this._HttpClient.post<Cart>(
      `${ApiEndpoint.CART}/items`,
      { productId, quantity }
    );
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    return this._HttpClient.put<Cart>(
      `${ApiEndpoint.CART}/items/${productId}`,
      { quantity }
    );
  }

  deleteItem(productId: number): Observable<Cart> {
    return this._HttpClient.delete<Cart>(`${ApiEndpoint.CART}/items/${productId}`);
  }
}
