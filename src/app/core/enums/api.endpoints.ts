import { environment } from '../../../../environments/environment';

export class ApiEndpoint {
  static PRODUCTS = `${environment.baseUrl}/api/v1/products`;
  static PRODUCTBRAND = `${environment.baseUrl}/api/v1/product-brands`;
  static CATEGORIES = `${environment.baseUrl}/api/v1/categories`;
  static CATEGORIES_BY_ID = `${environment.baseUrl}/api/v1/categories`;
  static WISHLIST = `${environment.baseUrl}/api/v1/wishlist`;
  static CART = `${environment.baseUrl}/api/v1/cart`;
  static CHATBOT = `${environment.baseUrl}/api/PrimeAi`;
  static OREDR = `${environment.baseUrl}/api/v1/Order/getOrderForUser`;
  static OREDR_BY_ID = `${environment.baseUrl}/api/v1/Order/getOrderById`;
  static DELIVERY_PAYMENT = `${environment.baseUrl}/api/v1/Order/checkOut`;
  static ONLINE_PAYMENT = `${environment.baseUrl}/api/v1/Payment/create-checkout-session`;
  // Static JSONs
  static TREATMENT = '/assets/data/treatment.json';
  static TEAM = '/assets/data/team.json';
  static TESTIMONIAL = '/assets/data/testimonial.json';
}
