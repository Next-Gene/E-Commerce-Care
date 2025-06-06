import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../interfaces/Cartitems';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartServiveService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.baseUrl}/cart`;

  getItems(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}`);
  }

  addItem(productId: number, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/items`, {
      productId,
      quantity,
    });
  }

  updateItem(productId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/items/${productId}`, {
      quantity,
    });
  }

  deleteItem(productId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/items/${productId}`);
  }
}
