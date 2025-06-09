import { Component, inject } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-single-product-title',
  imports: [TranslateModule],
  templateUrl: './single-product-title.component.html',
  styleUrl: './single-product-title.component.scss'
})
export class SingleProductTitleComponent {
  product!: Product;
  id: string = "";
quantity: number = 0;
  // Modal and rating variables
  showRatingModal: boolean = false;
  currentRating: number = 0;

  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>();
getphotos(){
this.product.productPhotos = this.product.productPhotos || [];

  const mainPhoto = this.product.productPhotos.find(p => p.isMain);
  this.product.photoUrl = mainPhoto ? mainPhoto.url : this.product.productPhotos[0]?.url;
}
  ngOnInit(): void {
    this.getParam();
      this.getphotos();
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
    this.quantity++;
  }
  decrease(product: any): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
changeMainImage(url: string): void {
  this.product.photoUrl = url;
}
}
