import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandAdapter } from '../adapters/brand.adapter';
import { APIBrandResponse } from '../interfaces/brand';
import { ApiEndpoint } from '../enums/api.endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private _httpClient: HttpClient,
    private _brandAdapter: BrandAdapter
  ) { }
  getAllBrands() {
 return this._httpClient.get<APIBrandResponse>(ApiEndpoint.ProductBrand).pipe(
  map((res) => this._brandAdapter.BrandAdapter(res)
 ))
  }
}
