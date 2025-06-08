import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiEndpoint } from '../enums/api.endpoints';
import { Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartServive {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private _HttpClient: HttpClient) {
    // Initialize cart count
    this.getItems().subscribe();
  }

  private updateCartItemCount(cart: Cart) {
    const count = cart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartItemCountSubject.next(count);
  }

  getItems(): Observable<Cart> {
    return this._HttpClient
      .get<Cart>(`${ApiEndpoint.CART}`)
      .pipe(tap((cart) => this.updateCartItemCount(cart)));
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this._HttpClient
      .post<Cart>(`${ApiEndpoint.CART}/items`, { productId, quantity })
      .pipe(tap((cart) => this.updateCartItemCount(cart)));
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    return this._HttpClient
      .put<Cart>(`${ApiEndpoint.CART}/items/${productId}`, { quantity })
      .pipe(tap((cart) => this.updateCartItemCount(cart)));
  }

  deleteItem(productId: number): Observable<Cart> {
    return this._HttpClient
      .delete<Cart>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(tap((cart) => this.updateCartItemCount(cart)));
  }
}
