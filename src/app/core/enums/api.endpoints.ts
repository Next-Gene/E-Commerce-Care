import { environment } from '../../../../environments/environment';

export class ApiEndpoint {
  static PRODUCTS = `${environment.baseUrl}/api/v1/products`;
  static CATEGORIES = `${environment.baseUrl}/api/v1/categories`;
  static CATEGORIES_BY_ID = `${environment.baseUrl}/api/v1/categories`;
  static WISHLIST = `${environment.baseUrl}/api/v1/wishlist`;
  static CART = `${environment.baseUrl}/api/v1/cart`;
  static CHATBOT = `${environment.baseUrl}/api/PrimeAi`;

  // Static JSONs
  static TREATMENT = '/assets/data/treatment.json';
  static TEAM = '/assets/data/team.json';
  static TESTIMONIAL = '/assets/data/testimonial.json';
}
