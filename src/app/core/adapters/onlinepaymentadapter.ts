import { Injectable } from '@angular/core';
import { OnlinePayment, APIOnlinePaymentResponse } from '../interfaces/onlinepayment';
@Injectable({
    providedIn: 'root',
})
export class OnlinePaymentAdapter {
    constructor() {}
    OnlinePaymentAdapter(rawRes: APIOnlinePaymentResponse): OnlinePayment {
        return {
            shippingAddress: rawRes.shippingAddress,
            deliveryMethodId: rawRes.deliveryMethodId,  
            notes: rawRes.notes,
        };
    }
}