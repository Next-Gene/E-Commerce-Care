import { DeliveryPaymentAdapter } from './../adapters/deliverypayment.adapter';
import { inject, Injectable } from '@angular/core';
import { DeliveryPayment } from '../interfaces/deliverypayment';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { DeliveryPaymentAPI } from '../base/deliverypaymentAPI';
import { ApiEndpoint } from '../enums/api.endpoints';
import { HttpClient } from '@angular/common/http';
import { DeliveryPaymentRes } from '../interfaces/deliverypaymentRes';
import { DeliveryPaymentResAdapter } from '../adapters/deliverypaymentRes.adapter';

@Injectable({
  providedIn: 'root',
})
export class DeliveryPaymentService {
  private paymentMethodSubject = new BehaviorSubject<string>('');
  paymentMethod$ = this.paymentMethodSubject.asObservable();
  private _orderResSubject = new BehaviorSubject<DeliveryPaymentRes | null>(null);
  orderRes$ = this._orderResSubject.asObservable();
  constructor(
    private _HttpClient: HttpClient,
    private _deliveryPaymentAdapter: DeliveryPaymentAdapter,
    private _deliveryPaymentResAdapter: DeliveryPaymentResAdapter
  ) {}

  setPaymentMethod(method: string) {
    this.paymentMethodSubject.next(method);
  }

  getPaymentMethod() {
    return this.paymentMethodSubject.value;
  }

  createDeliveryPayment(deliveryPayment: DeliveryPayment): Observable<DeliveryPaymentRes> {
    return this._HttpClient
      .post<DeliveryPaymentRes>(ApiEndpoint.DELIVERY_PAYMENT, deliveryPayment)
      .pipe(
        map(res => this._deliveryPaymentResAdapter.DeliveryPaymentResAdapter(res)),
        tap(adapted => this._orderResSubject.next(adapted))
      );
  }

  getDeliveryPaymentRes(): Observable<DeliveryPaymentRes | null> {
    return this.orderRes$;
  }
}
