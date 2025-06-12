import { Injectable } from '@angular/core';
import { APICartResponse, Cart } from '../interfaces/cart';

@Injectable({
  providedIn: 'root',
})
export class CartAdapter {
  constructor() {}

  CartAdapter(response: APICartResponse): Cart {
    return {
      id: response.id,
      cartItems: response.cartItems,
      totalPrice: response.totalPrice,
      taxAmount: response.taxAmount,
      totalPriceWithTax: response.totalPriceWithTax,
      deliveryMethodId: response.deliveryMethodId,
      clientSecret: response.clientSecret,
      paymentIntentId: response.paymentIntentId,
    };
  }
}
