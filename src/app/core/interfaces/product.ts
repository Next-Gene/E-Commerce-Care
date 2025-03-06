export interface Product {
  _id?: string;
  title?: string;
  slug?: string;
  description?: string;
  imgCover?: string;
  images?: string[];
  price?: number;
  priceAfterDiscount?: number;
  quantity?: number;
  category?: string;
  occasion?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  discount?: number;
  sold?: number;
  id?: string;
}

export interface APIProductsResponse {
  message: string;
  products: Product[];
}
