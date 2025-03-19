import { Component, inject } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-product-title',
  imports: [],
  templateUrl: './single-product-title.component.html',
  styleUrl: './single-product-title.component.scss'
})
export class SingleProductTitleComponent {
  product!: Product;
  id: string = "";

  // Modal and rating variables
  showRatingModal: boolean = false;
  currentRating: number = 0;

  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getParam();
  }

  getParam(): void {
    this._Activatedroute.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (params) => {
          this.id = params.get('id') || '';
          if (this.id) {
            this._ProductsService.getProductById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res) => {
                  this.product = res;
                }
              });
          }
        }
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
    this.product.imgCover = newImage;
}

}
