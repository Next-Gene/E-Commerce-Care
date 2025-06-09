import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  EMPTY,
  map,
  catchError,
  throwError,
} from 'rxjs';
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
    private http: HttpClient,
    private toastr: ToastrService,
    private cartAdapter: CartAdapter
  ) {
    this.loadCart();
  }

  private loadCart(): void {
    this.getCart().subscribe();
  }

  private updateCartState(cart: Cart): void {
    this.cartSubject.next(cart);
    this.updateCartItemCount(cart);
  }

  private updateCartItemCount(cart: Cart): void {
    const count = cart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartItemCountSubject.next(count);
  }

  getCart(): Observable<Cart> {
    return this.http.get<APICartResponse>(`${ApiEndpoint.CART}`).pipe(
      map((res) => this.cartAdapter.CartAdapter(res)),
      tap((cart) => this.updateCartState(cart)),
      catchError((error) => {
        this.toastr.error('Failed to load cart', 'Error');
        return EMPTY;
      })
    );
  }

  addToCart(productId: number, quantity: number = 1): Observable<Cart> {
    return this.http
      .post<APICartResponse>(`${ApiEndpoint.CART}/items`, {
        productId,
        quantity,
      })
      .pipe(
        map((res) => this.cartAdapter.CartAdapter(res)),
        tap((cart) => this.updateCartState(cart)),
        catchError((error) => {
          this.toastr.error('Failed to add item to cart', 'Error');
          return throwError(() => error);
        })
      );
  }

  updateCart(productId: number, quantity: number): Observable<Cart> {
    if (quantity < 1 || quantity > 99) {
      this.toastr.error('Quantity must be between 1 and 99', 'Error');
      return EMPTY;
    }

    return this.http
      .put<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}/quantity`, {
        quantity,
      })
      .pipe(
        map((res) => this.cartAdapter.CartAdapter(res)),
        tap((cart) => {
          this.updateCartState(cart);
          this.toastr.success('Quantity updated', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          });
        }),
        catchError((error) => {
          this.toastr.error('Failed to update quantity', 'Error');
          return throwError(() => error);
        })
      );
  }

  removeFromCart(productId: number): Observable<Cart> {
    return this.http
      .delete<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(
        map((res) => this.cartAdapter.CartAdapter(res)),
        tap((cart) => {
          this.updateCartState(cart);
          this.toastr.info('Item removed from cart', 'Removed', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          });
        }),
        catchError((error) => {
          this.toastr.error('Failed to remove item', 'Error');
          return throwError(() => error);
        })
      );
  }

  getCartItemById(productId: number): Observable<Cart> {
    return this.http
      .get<APICartResponse>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(
        map((res) => this.cartAdapter.CartAdapter(res)),
        catchError((error) => {
          this.toastr.error('Failed to retrieve item from cart', 'Error');
          return throwError(() => error);
        })
      );
  }

  // Aliases
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
