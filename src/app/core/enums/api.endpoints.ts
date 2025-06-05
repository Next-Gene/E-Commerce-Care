import { environment } from '../../../../environments/environment';

export class ApiEndpoint {
  static PRODUCTS = `${environment.baseUrl}/api/v1/products`;
  static CATEGORIES = `${environment.baseUrl}/api/v1/categories`;
  static CATEGORIES_BY_ID = `${environment.baseUrl}/api/v1/categories`;
  static TREARMENT = '/assets/data/treatment.json';
  static team = '/assets/data/team.json';
  static Testimonial = '/assets/data/testimonial.json';
}
