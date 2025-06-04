import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../enums/api.endpoints';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoriesAPI } from '../base/CategoriesAPI';
import { CategoriesAdapter } from '../adapters/categories.adapter';
import { APICategoriesResponse, Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements CategoriesAPI {
  constructor(
    private _httpClient: HttpClient,
    private _categoriesAdapter: CategoriesAdapter
  ) {}

  getAllCategories(): Observable<Category[]> {
    return this._httpClient
      .get<APICategoriesResponse>(ApiEndpoint.CATEGORIES)
      .pipe(
        map((res: APICategoriesResponse) =>
          this._categoriesAdapter.CategoriesAdapter(res)
        )
      );
  }

  getCategoryById(id: string | number): Observable<Category> {
    return this._httpClient
      .get<Category>(`${ApiEndpoint.CATEGORIES_BY_ID}/${id}`)
      .pipe(
        map((res: any) => {
          if (!res) {
            throw new Error(`Category with ID ${id} not found`);
          }
          return res.data;
        })
      );
  }
}
