export interface Wishlist {
  id: string;
  items: WishlistItem[];
  totalItems: number;
}

export interface WishlistItem {
  id: number;
  price: number;
  productName: string;
  pictureUrl: string;
  brand: string;
  category: string;
  addedAt: Date;
}
