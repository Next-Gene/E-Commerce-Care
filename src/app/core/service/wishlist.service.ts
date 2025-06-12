import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIWishlistResponse } from '../interfaces/wishlist';
import { ApiEndpoint } from '../enums/api.endpoints';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<APIWishlistResponse> {
    return this.http.get<APIWishlistResponse>(ApiEndpoint.WISHLIST);
  }

  addItem(productId: number): Observable<APIWishlistResponse> {
    return this.http.post<APIWishlistResponse>(
      `${ApiEndpoint.WISHLIST}/items`,
      { productId }
    );
  }

  deleteItem(productId: number): Observable<APIWishlistResponse> {
    return this.http.delete<APIWishlistResponse>(
      `${ApiEndpoint.WISHLIST}/items/${productId}`
    );
  }
}
