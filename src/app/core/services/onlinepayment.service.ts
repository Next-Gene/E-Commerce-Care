import { Injectable } from '@angular/core';
import { OnlinePayment } from '../interfaces/onlinepayment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs/operators';
import { OnlinePaymentAdapter } from '../adapters/onlinepayment.adapter';

@Injectable({
  providedIn: 'root',
})
export class OnlinepaymentService {
  constructor(
    private http: HttpClient,
    private adapter: OnlinePaymentAdapter
  ) {}

  createOnlinePayment(onlinePayment: OnlinePayment): Observable<OnlinePayment> {
    return this.http
      .post<OnlinePayment>(`${ApiEndpoint.ONLINE_PAYMENT}`, onlinePayment)
      .pipe(map((res) => this.adapter.OnlinePaymentAdapter(res)));
  }
}
