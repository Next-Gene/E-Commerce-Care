import { Injectable } from '@angular/core';
import { DeliveryPaymentRes } from '../interfaces/deliverypaymentRes';

@Injectable({
    providedIn: 'root',
})
export class DeliveryPaymentResAdapter {
    constructor() {}
    DeliveryPaymentResAdapter(rawRes: DeliveryPaymentRes): DeliveryPaymentRes {
        return {
            buyerEmail: rawRes.buyerEmail,
            orderDate: rawRes.orderDate,
            shippingAddress: rawRes.shippingAddress,
            deliveryMethod: rawRes.deliveryMethod,
            orderItems: rawRes.orderItems,
            subtotal: rawRes.subtotal,
            status: rawRes.status,
            paymentIntentId: rawRes.paymentIntentId,
            id: rawRes.id,
        }
    }
}   