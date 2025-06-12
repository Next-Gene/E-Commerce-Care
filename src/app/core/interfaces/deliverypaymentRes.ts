export interface DeliveryPaymentRes {
    buyerEmail: string
    orderDate: string
    shippingAddress: ShippingAddress
    deliveryMethod: DeliveryMethod
    orderItems: OrderItem[]
    subtotal: number
    status: string
    paymentIntentId: any
    id: number
  }
  
  export interface ShippingAddress {
    firstName: string
    lastName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    zipCode: string
  }
  
  export interface DeliveryMethod {
    shortName: string
    deliveryTime: string
    description: string
    price: number
    id: number
  }
  
  export interface OrderItem {
    itemOrderd: ItemOrderd
    price: number
    quantity: number
    id: number
  }
  
  export interface ItemOrderd {
    productItemId: number
    productName: string
    productImageUrl: string
  }
  