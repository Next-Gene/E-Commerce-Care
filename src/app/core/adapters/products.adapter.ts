import { Injectable } from '@angular/core';
import { APIProductsResponse, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsAdapter {
  constructor() {}

  ProductsAdapter(rawRes: APIProductsResponse): Product[] {
    return rawRes.products.map((resItem) => ({
      _id: resItem._id,
      title: resItem.title,
      price: resItem.price,
      priceAfterDiscount: resItem.priceAfterDiscount,
      imgCover: resItem.imgCover,
      category: resItem.category,
    }));
  }
}
