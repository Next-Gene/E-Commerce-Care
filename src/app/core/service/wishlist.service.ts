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
    return this._HttpClient.post<Wishlist>(
      `${ApiEndpoint.WISHLIST}/items`,
      { productId }   
    ).pipe(
      tap((res) => {
        this.toastr.success('item added to wishlist', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr animate__animated animate__fadeInRight',
          });
      })
    );
  }

  deleteItem(productId: number): Observable<Wishlist> {
    return this._HttpClient.delete<Wishlist>(
      `${ApiEndpoint.WISHLIST}/items/${productId}`
    ).pipe(
      tap((res) => {
        this.toastr.error('item removed from wishlist', 'Removed', {
          timeOut: 3000,
        });
      })
    );
  }
}
