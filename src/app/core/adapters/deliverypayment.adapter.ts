// adapters/deliverypayment.adapter.ts
import { Injectable } from '@angular/core';
import { APIDeliveryPaymentResponse, DeliveryPayment } from '../interfaces/deliverypayment';

@Injectable({ providedIn: 'root' })
export class DeliveryPaymentAdapter {
  DeliveryPaymentAdapter(raw: APIDeliveryPaymentResponse): DeliveryPayment {
    return {
      deliveryMethodId: raw.deliveryMethodId,
      shippingAddress: {
        firstName: raw.shippingAddress.firstName,
        lastName:  raw.shippingAddress.lastName,
        street:    raw.shippingAddress.street,
        city:      raw.shippingAddress.city,
        state:     raw.shippingAddress.state,
        zipCode:   raw.shippingAddress.zipCode,
        phoneNumber: raw.shippingAddress.phoneNumber,
        email:     raw.shippingAddress.email,
      }
    };
  }
}
