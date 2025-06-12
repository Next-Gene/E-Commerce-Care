import { Injectable } from '@angular/core';
import { DeliveryPayment, APIDeliveryPaymentResponse } from '../interfaces/deliverypayment';
@Injectable({
    providedIn: 'root',
})
export class DeliveryPaymentAdapter {
    constructor() {}
    DeliveryPaymentAdapter(rawRes: APIDeliveryPaymentResponse): DeliveryPayment {
        return {
            deliveryMethodId: rawRes.deliveryMethodId,
            shippingAddress: rawRes.shippingAddress,
        };
    }
}
