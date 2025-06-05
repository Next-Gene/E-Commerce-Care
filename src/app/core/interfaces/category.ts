export interface Category {
  id: number;
  name: string;
  slug: string;
  categoryPhoto: string | null;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

// The API returns a single category object directly for getCategoryById
export type CategoryResponse = Category;

export type APICategoriesResponse = Category[];

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}
