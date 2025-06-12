import { Injectable } from '@angular/core';
import { OnlinePayment } from '../interfaces/onlinepayment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiEndpoint } from '../enums/api.endpoints';
import { HttpClient } from '@angular/common/http';
import { OnlinePaymentAdapter } from '../adapters/onlinepaymentadapter';
import { OnlinePaymentRes } from '../interfaces/onlinepaymentRes';

@Injectable({
  providedIn: 'root',
})
export class OnlinePaymentService {
  private paymentMethodSubject = new BehaviorSubject<string>('');
  paymentMethod$ = this.paymentMethodSubject.asObservable();

  constructor(
    private _HttpClient: HttpClient,
    private _onlinePaymentAdapter: OnlinePaymentAdapter
  ) {}
  setPaymentMethod(method: string) {
    this.paymentMethodSubject.next(method);
  }

  getPaymentMethod() {
    return this.paymentMethodSubject.value;
  }

  createOnlinePayment(
    onlinePayment: OnlinePayment
  ): Observable<OnlinePaymentRes> {
    return this._HttpClient.post<OnlinePaymentRes>(
      ApiEndpoint.ONLINE_PAYMENT,
      onlinePayment
    );
  }
}
