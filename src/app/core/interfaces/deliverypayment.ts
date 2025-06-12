export interface DeliveryPayment {
    deliveryMethodId: number;
    shippingAddress: ShippingAddress;
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
  
  export type APIDeliveryPaymentResponse = DeliveryPayment;