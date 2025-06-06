import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { environment } from '../../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartServive {
  private apiUrl = `${environment.baseUrl}/api/v1/cart`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getItems(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}`, {
      headers: { Authorization: `Bearer  ${this.auth.getToken()}` },
    });
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(
      `${this.apiUrl}/items`,
      { productId, quantity },
      { headers: { Authorization: `Bearer  ${this.auth.getToken()}` } }
    );
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(
      `${this.apiUrl}/items/${productId}`,
      { quantity },
      { headers: { Authorization: `Bearer  ${this.auth.getToken()}` } }
    );
  }

  deleteItem(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${productId}`, {
      headers: { Authorization: `Bearer  ${this.auth.getToken()}` },
    });
  }
}
