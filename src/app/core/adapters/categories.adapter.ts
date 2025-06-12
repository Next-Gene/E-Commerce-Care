import { Injectable } from '@angular/core';
import { APICategoriesResponse, Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesAdapter {
  constructor() {}

  CategoriesAdapter(rawRes: APICategoriesResponse): Category[] {
    return rawRes.map((resItem: Category) => ({
      id: resItem.id,
      photoUrl: resItem.photoUrl,
      name: resItem.name,
      description: resItem.description,
      slug: resItem.slug,
      categoryPhoto: resItem.categoryPhoto,
      createdAt: resItem.createdAt,
      updatedAt: resItem.updatedAt,
    }));
  }
}
