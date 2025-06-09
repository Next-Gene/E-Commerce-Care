import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, EMPTY, map, catchError } from 'rxjs';
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
  private readonly CART_STORAGE_KEY = 'cart_data';

  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  constructor(
    private _HttpClient: HttpClient,
    private toastr: ToastrService,
    private _cartAdapter: CartAdapter
  ) {
    // Try to restore cart from storage first
    this.restoreCartFromStorage();
    // Then get fresh data from server
    this.getCart().subscribe();
  }

  private updateCartState(cart: Cart) {
    this.cartSubject.next(cart);
    this.updateCartItemCount(cart);
    this.saveCartToStorage(cart);
  }

  private updateCartItemCount(cart: Cart) {
    const count = cart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartItemCountSubject.next(count);
  }

  private saveCartToStorage(cart: Cart) {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  private restoreCartFromStorage() {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart) as Cart;
        this.updateCartState(cart);
      } catch (error) {
        console.error('Error restoring cart from storage:', error);
        localStorage.removeItem(this.CART_STORAGE_KEY);
      }
    }
  }

  getCart(): Observable<Cart> {
    return this._HttpClient.get<APICartResponse>(`${ApiEndpoint.CART}`).pipe(
      map((res) => this._cartAdapter.CartAdapter(res)),
      tap((cart) => this.updateCartState(cart)),
      catchError((error) => {
        // If server request fails, use cached cart
        const currentCart = this.cartSubject.getValue();
        if (currentCart) {
          return new Observable<Cart>((observer) => {
            observer.next(currentCart);
            observer.complete();
          });
        }
        throw error;
      })
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
          this.toastr.success('Item added to cart', 'Success');
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
          this.toastr.success('Quantity updated', 'Success');
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
          this.toastr.error('Item removed from cart', 'Removed');
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
