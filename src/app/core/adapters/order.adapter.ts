import { Injectable } from '@angular/core';
import { APIOrderResponse, order, ShippingAddress, OrderItem } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderAdapter {
  constructor() {}

  OrdersAdapter(rawRes: APIOrderResponse): order[] {
    return rawRes.map((resItem: order) => ({
      id: resItem.id,
      buyerEmail: resItem.buyerEmail,
      orderDate: resItem.orderDate,
      shippingAddress: this.adaptShippingAddress(resItem.shippingAddress),
      deliveryMethod: resItem.deliveryMethod,
      shippingPrice: resItem.shippingPrice,
      orderItems: resItem.orderItems.map((item: any) => this.adaptOrderItem(item)),
      subtotal: resItem.subtotal,
      total: resItem.total,
      status: resItem.status,
    }));
  }

  private adaptShippingAddress(address: any): ShippingAddress {
    return {
      firstName: address.firstName,
      lastName: address.lastName,
      phoneNumber: address.phoneNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    };
  }

  private adaptOrderItem(item: any): OrderItem {
    return {
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      pictureUrl: item.pictureUrl,
    };
  }
}
