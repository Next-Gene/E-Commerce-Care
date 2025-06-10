import { Observable } from 'rxjs';
import { APIWishlistResponse } from '../interfaces/wishlist';

export abstract class WishlistAPI {
  abstract getItems(): Observable<APIWishlistResponse>;
  abstract addItem(productId: number): Observable<APIWishlistResponse>;
  abstract deleteItem(productId: number): Observable<APIWishlistResponse>;
}
