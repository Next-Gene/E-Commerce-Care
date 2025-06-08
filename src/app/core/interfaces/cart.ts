export interface Cart {
  id: string;
  cartItems: CartItem[];
  totalPrice: number;
  taxAmount: number;
  totalPriceWithTax: number;
  // deliveryMethodId: null;
  // clientSecret: null;
  // paymentIntentId: null;
}

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  category: string;
}
