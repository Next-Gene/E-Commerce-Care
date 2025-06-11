import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderAdapter } from '../adapters/order.adapter';
import { map, Observable } from 'rxjs';
import { APIOrderResponse, order } from '../interfaces/order';
import { ApiEndpoint } from '../enums/api.endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
     private _httpClient: HttpClient,
     private _OrderAdapter:OrderAdapter
  ) { }
   getAllOrders(): Observable<order[]> {
      return this._httpClient.get<APIOrderResponse>(ApiEndpoint.OREDR).pipe(
          map((res) =>
            this._OrderAdapter.OrdersAdapter(res)
          )
        );
    }



     getOrderById(id: string | number): Observable<order> {
        return this._httpClient
          .get<order>(`${ApiEndpoint.OREDR_BY_ID}/${id}`)
          .pipe(
            map((res: any) => {
              if (!res) {
                throw new Error(`order with ID ${id} not found`);
              }
              return res;
            })
          );
      }
}
