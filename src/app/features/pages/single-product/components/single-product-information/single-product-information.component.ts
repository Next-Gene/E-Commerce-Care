import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-single-product-information',
  imports: [CommonModule, TranslateModule],
  templateUrl: './single-product-information.component.html',
  styleUrl: './single-product-information.component.scss'
})
export class SingleProductInformationComponent {
  product!: Product;
  id: string = "";
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
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
