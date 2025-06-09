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
      .pipe(map((res) => this._productsAdapter.ProductsAdapter(res)));
  }
  getProductById(id: string): Observable<Product> {
    return this._httpClient.get<APIProductsResponse>(ApiEndpoint.PRODUCTS).pipe(
      map((res: APIProductsResponse) => {
        const product = res.find((p) => String(p.id) === String(id));
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
        return product;
      })
    );
  }

  getRelatedProducts(
    category: string,
    excludeProductId: string
  ): Observable<Product[]> {
    return this._httpClient.get<APIProductsResponse>(ApiEndpoint.PRODUCTS).pipe(
      map((res: APIProductsResponse) => {
        return res.filter(
          (p) =>
            p.category === category && String(p.id) !== String(excludeProductId)
        );
      })
    );
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this._httpClient.get<APIProductsResponse>(ApiEndpoint.PRODUCTS).pipe(
      map((res: APIProductsResponse) => {
        const filteredProducts = res.filter(
          (product) =>
            product.category?.toLowerCase() === categoryName.toLowerCase()
        );
        return this._productsAdapter.ProductsAdapter(filteredProducts);
      })
    );
  }
}
