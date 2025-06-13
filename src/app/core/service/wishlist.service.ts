import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  EMPTY,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { APIWishlistResponse } from '../interfaces/wishlist';
import { ApiEndpoint } from '../enums/api.endpoints';
import { AuthService } from './auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<APIWishlistResponse | null>(
    null
  );
  wishlist$ = this.wishlistSubject.asObservable();
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  constructor(private http: HttpClient) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    if (!this.authService.isAuthenticated()) {
      this.wishlistSubject.next(null);
      return;
    }
    this.getItems().subscribe();
  }

  getItems(): Observable<APIWishlistResponse> {
    if (!this.authService.isAuthenticated()) {
      return EMPTY;
    }

    return this.http.get<APIWishlistResponse>(ApiEndpoint.WISHLIST).pipe(
      tap((wishlist) => this.wishlistSubject.next(wishlist)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.wishlistSubject.next(null);
          return EMPTY;
        }
        this.toastr.error('Failed to load wishlist', 'Error');
        return throwError(() => error);
      })
    );
  }

  addItem(productId: number): Observable<APIWishlistResponse> {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning(
        'Please login to add items to wishlist',
        'Authentication Required'
      );
      return EMPTY;
    }

    return this.http
      .post<APIWishlistResponse>(`${ApiEndpoint.WISHLIST}/items`, { productId })
      .pipe(
        tap((wishlist) => {
          this.wishlistSubject.next(wishlist);
          this.toastr.success('Item added to wishlist', 'Success');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.wishlistSubject.next(null);
            this.toastr.warning(
              'Please login to add items to wishlist',
              'Authentication Required'
            );
            return EMPTY;
          }
          this.toastr.error('Failed to add item to wishlist', 'Error');
          return throwError(() => error);
        })
      );
  }

  deleteItem(productId: number): Observable<APIWishlistResponse> {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning(
        'Please login to remove items from wishlist',
        'Authentication Required'
      );
      return EMPTY;
    }

    return this.http
      .delete<APIWishlistResponse>(`${ApiEndpoint.WISHLIST}/items/${productId}`)
      .pipe(
        tap((wishlist) => {
          this.wishlistSubject.next(wishlist);
          this.toastr.success('Item removed from wishlist', 'Success');
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.wishlistSubject.next(null);
            this.toastr.warning(
              'Please login to remove items from wishlist',
              'Authentication Required'
            );
            return EMPTY;
          }
          this.toastr.error('Failed to remove item from wishlist', 'Error');
          return throwError(() => error);
        })
      );
  }
}
