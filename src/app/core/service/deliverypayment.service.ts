import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryPaymentAdapter } from '../adapters/deliverypayment.adapter';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs/operators';
import { DeliveryPayment } from '../interfaces/deliverypayment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverypaymentService {
  private _HttpClient = inject(HttpClient);
  private _DeliveryPaymentAdapter = inject(DeliveryPaymentAdapter);
  constructor() { }
  createDeliveryPayment(deliveryPayment: DeliveryPayment): Observable<DeliveryPayment> {
    return this._HttpClient.post<DeliveryPayment>(`${ApiEndpoint.DELIVERY_PAYMENT}`, deliveryPayment).pipe(
      map((res) => this._DeliveryPaymentAdapter.DeliveryPaymentAdapter(res))
    );
  }
}
