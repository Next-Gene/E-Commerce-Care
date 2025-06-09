import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, EMPTY, map } from 'rxjs';
import { ApiEndpoint } from '../enums/api.endpoints';
import { APICartResponse, Cart } from '../interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { CartAPI } from '../base/CartAPI';
import { CartAdapter } from '../adapters/cart.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartService implements CartAPI {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartSubject = new BehaviorSubject<Cart | null>(null);

  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  constructor(
    private _HttpClient: HttpClient,
    private toastr: ToastrService,
    private _cartAdapter: CartAdapter
  ) {
    this.getCart().subscribe();
  }

  private updateCartState(cart: Cart) {
    this.cartSubject.next(cart);
    this.updateCartItemCount(cart);
  }

  private updateCartItemCount(cart: Cart) {
    const count = cart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartItemCountSubject.next(count);
  }

  getCart(): Observable<Cart> {
    return this._HttpClient.get<APICartResponse>(`${ApiEndpoint.CART}`).pipe(
      map((res) => this._cartAdapter.CartAdapter(res)),
      tap((cart) => this.updateCartState(cart))
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<Cart> {
    return this._HttpClient
      .post<APICartResponse>(`${ApiEndpoint.CART}/items`, {
        productId,
        quantity,
      })
      .pipe(
        map((res) => this._cartAdapter.CartAdapter(res)),
        tap((cart) => {
          this.updateCartState(cart);
        })
      );
  }

  updateCart(productId: number, quantity: number): Observable<Cart> {
    if (quantity < 1 || quantity > 99) {
      this.toastr.error('Quantity must be between 1 and 99', 'Error');
      return EMPTY;
    }

    return this._HttpClient
      .put<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}/quantity`, {
        quantity,
      })
      .pipe(
        map((res) => this._cartAdapter.CartAdapter(res)),
        tap((cart) => {
          this.updateCartState(cart);

        })
      );
  }

  removeFromCart(productId: number): Observable<Cart> {
    return this._HttpClient
      .delete<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(
        map((res) => this._cartAdapter.CartAdapter(res)),
        tap((cart) => {
          this.updateCartState(cart);

        })
      );
  }

  getCartItemById(productId: number): Observable<Cart> {
    return this._HttpClient
      .get<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(map((res) => this._cartAdapter.CartAdapter(res)));
  }

  // Aliases for convenience (optional)
  getItems(): Observable<Cart> {
    return this.getCart();
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this.addToCart(productId, quantity);
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    return this.updateCart(productId, quantity);
  }

  deleteItem(productId: number): Observable<Cart> {
    return this.removeFromCart(productId);
  }
}
