export interface OnlinePayment {
    shippingAddress: ShippingAddress;
    deliveryMethodId: number;
    notes: string;
  }
  
  export interface ShippingAddress {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    email: string;
  }
  
  export type APIOnlinePaymentResponse = OnlinePayment;