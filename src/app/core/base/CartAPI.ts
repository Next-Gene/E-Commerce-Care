import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';

export abstract class CartAPI {
  abstract getCart(): Observable<Cart>;
  abstract addToCart(productId: number, quantity: number): Observable<Cart>;
  abstract removeFromCart(productId: number): Observable<Cart>;
  abstract updateCart(productId: number, quantity: number): Observable<Cart>;
  abstract getCartItemById(productId: number): Observable<Cart>;
}
