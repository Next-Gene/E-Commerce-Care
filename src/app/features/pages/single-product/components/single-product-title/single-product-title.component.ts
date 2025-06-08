import { Component, inject } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CartServive } from '../../../../../core/service/cart.service';
import { WishlistServive } from '../../../../../core/service/wishlist.service';

@Component({
  selector: 'app-single-product-title',
  imports: [TranslateModule],
  templateUrl: './single-product-title.component.html',
  styleUrl: './single-product-title.component.scss',
})
export class SingleProductTitleComponent {
  product!: Product;
  id: string = '';

  // Modal and rating variables
  showRatingModal: boolean = false;
  currentRating: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartServive,
    private _WishlistService: WishlistServive
  ) {}

  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getParam();
  }

  addToCart() {
    this._CartService.addItem(Number(this.id)).subscribe({
      next: (res) => {
        alert('item added to cart');
      },
      error: (err) => {
        alert('failed add item to cart');
      },
    });
  }

  addToWishlist() {
    this._WishlistService.addItem(Number(this.id)).subscribe({
      next: (res) => {
        alert('item added to wishlist');
      },
      error: (err) => {
        if (err.status === 409) {
          alert('item already in wishlist');
        } else {
          alert('failed add item to wishlist');
        }
      },
    });
  }

  getParam(): void {
    this._Activatedroute.paramMap.pipe(takeUntil(this._destroy$)).subscribe({
      next: (params) => {
        this.id = params.get('id') || '';
        if (this.id) {
          this._ProductsService
            .getProductById(this.id)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
              next: (res) => {
                this.product = res;
              },
            });
        }
      },
    });
  }
  increase(product: any): void {
    product.quantity++;
  }
  decrease(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  changeMainImage(newImage: string) {
    this.product.photoUrl = newImage;
  }
}
