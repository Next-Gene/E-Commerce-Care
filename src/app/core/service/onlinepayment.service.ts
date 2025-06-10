import { inject, Injectable } from '@angular/core';
import { OnlinePayment } from '../interfaces/onlinepayment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs/operators';
import { OnlinePaymentAdapter } from '../adapters/onlinepayment.adapter';

@Injectable({
  providedIn: 'root'
})
export class OnlinepaymentService {
  private _HttpClient = inject(HttpClient);
  private _OnlinePaymentAdapter = inject(OnlinePaymentAdapter);
  constructor() { }
  createOnlinePayment(onlinePayment: OnlinePayment): Observable<OnlinePayment> {
    return this._HttpClient.post<OnlinePayment>(`${ApiEndpoint.ONLINE_PAYMENT}`, onlinePayment).pipe(
      map((res) => this._OnlinePaymentAdapter.OnlinePaymentAdapter(res))
    );
  }
}
