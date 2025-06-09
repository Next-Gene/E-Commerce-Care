import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';
import { ApiEndpoint } from '../enums/api.endpoints';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WishlistServive {

  constructor(private _HttpClient: HttpClient, private toastr: ToastrService) {}

  getItems(): Observable<Wishlist> {
      return this._HttpClient.get<Wishlist>(`${ApiEndpoint.WISHLIST}`);
  }

  addItem(productId: number): Observable<Wishlist> {
    return this._HttpClient.post<Wishlist>(`${ApiEndpoint.WISHLIST}/items`, {
      productId,
    });
  }

  deleteItem(productId: number): Observable<Wishlist> {
    return this._HttpClient.delete<Wishlist>(
      `${ApiEndpoint.WISHLIST}/items/${productId}`
    )
  }
}
