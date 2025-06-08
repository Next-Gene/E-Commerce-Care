import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, EMPTY } from 'rxjs';
import { ApiEndpoint } from '../enums/api.endpoints';
import { Cart } from '../interfaces/cart';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartServive {
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartSubject = new BehaviorSubject<Cart | null>(null);

  cartItemCount$ = this.cartItemCountSubject.asObservable();
  cart$ = this.cartSubject.asObservable();

  constructor(private _HttpClient: HttpClient, private toastr: ToastrService) {
    // Initialize cart
    this.getItems().subscribe();
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

  getItems(): Observable<Cart> {
    return this._HttpClient
      .get<Cart>(`${ApiEndpoint.CART}`)
      .pipe(tap((cart) => this.updateCartState(cart)));
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this._HttpClient
      .post<Cart>(`${ApiEndpoint.CART}/items`, { productId, quantity })
      .pipe(tap((cart) => this.updateCartState(cart)));
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    if (quantity < 1) {
      this.toastr.error('Quantity cannot be less than 1', 'Error');
      return EMPTY;
    }
    if (quantity > 99) {
      this.toastr.error('Quantity cannot be more than 99', 'Error');
      return EMPTY;
    }

    return this._HttpClient
      .put<Cart>(`${ApiEndpoint.CART}/items/${productId}/quantity`, {
        quantity,
      })
      .pipe(
        tap((cart) => {
          this.updateCartState(cart);
          this.toastr.success('Quantity updated', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__fadeInUp',
          });
        })
      );
  }

  deleteItem(productId: number): Observable<Cart> {
    return this._HttpClient
      .delete<Cart>(`${ApiEndpoint.CART}/items/${productId}`)
      .pipe(
        tap((cart) => {
          this.updateCartState(cart);
          this.toastr.error('Item removed from cart', 'Removed', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__shakeX',
          });
        })
      );
  }
}
