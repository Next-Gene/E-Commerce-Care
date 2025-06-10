
export type APIOrderResponse = order[]


export interface order {
  id: number
  buyerEmail: string
  orderDate: string
  shippingAddress: ShippingAddress
  deliveryMethod: string
  shippingPrice: number
  orderItems: OrderItem[]
  subtotal: number
  total: number
  status: string
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

export interface OrderItem {
  productId: number
  productName: string
  price: number
  quantity: number
  pictureUrl: string
}
