import { Injectable } from '@angular/core';
import { APIWishlistResponse, Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistAdapter {
  constructor() {}

  adapt(response: APIWishlistResponse): Wishlist {
    return {
      id: response.id,
      items: response.items,
      totalItems: response.totalItems,
    };
  }
}
