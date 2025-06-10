import { Injectable } from '@angular/core';
import { APIBrandResponse, brand } from '../interfaces/brand';
@Injectable({
  providedIn: 'root',
})
export class BrandAdapter {
  constructor() {}
  BrandAdapter(rawRes: APIBrandResponse): brand[] {
    return rawRes.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }
}
