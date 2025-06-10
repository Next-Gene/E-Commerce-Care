import { Injectable } from '@angular/core';
import {
  APIOnlinePaymentResponse,
  OnlinePayment,
} from '../interfaces/onlinepayment';

@Injectable({
  providedIn: 'root',
})
export class OnlinePaymentAdapter {
  constructor() {}

  OnlinePaymentAdapter(rawRes: APIOnlinePaymentResponse): OnlinePayment {
    return {
      deliveryMethodId: rawRes.deliveryMethodId,
      shippingAddress: {
        firstName: rawRes.shippingAddress.firstName,
        lastName: rawRes.shippingAddress.lastName,
        street: rawRes.shippingAddress.street,
        city: rawRes.shippingAddress.city,
        state: rawRes.shippingAddress.state,
        zipCode: rawRes.shippingAddress.zipCode,
        phoneNumber: rawRes.shippingAddress.phoneNumber,
        email: rawRes.shippingAddress.email,
      },
      notes: rawRes.notes,
    };
  }
}
