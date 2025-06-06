import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';
import { environment } from '../../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistServive {
  private apiUrl = `${environment.baseUrl}/api/v1/wishlist`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getItems(): Observable<Wishlist> {
    return this.http.get<Wishlist>(`${this.apiUrl}`, {
      headers: { Authorization: `Bearer  ${this.auth.getToken()}` },
    });
  }

  addItem(productId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(
      `${this.apiUrl}/items`,
      { productId },
      { headers: { Authorization: `Bearer  ${this.auth.getToken()}` } }
    );
  }

  deleteItem(productId: number): Observable<Wishlist> {
    return this.http.delete<Wishlist>(`${this.apiUrl}/items/${productId}`, {
      headers: { Authorization: `Bearer  ${this.auth.getToken()}` },
    });
  }
}
