import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsAPI } from '../base/ProductsAPI';
import { map, Observable } from 'rxjs';
import { APIProductsResponse, Product } from '../interfaces/product';
import { ApiEndpoint } from '../enums/api.endpoints';
import { ProductsAdapter } from '../adapters/products.adapter';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements ProductsAPI {
  constructor(
    private _httpClient: HttpClient,
    private _productsAdapter: ProductsAdapter
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this._httpClient
      .get<APIProductsResponse>(ApiEndpoint.PRODUCTS)
      .pipe(
        map((res: APIProductsResponse) =>
          this._productsAdapter.ProductsAdapter(res)
        )
      );
  }
}
