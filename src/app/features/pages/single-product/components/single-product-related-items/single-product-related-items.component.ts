import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from '../../../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-product-related-items',
  imports: [CartComponent, CommonModule],
  templateUrl: './single-product-related-items.component.html',
  styleUrl: './single-product-related-items.component.scss'
})
export class SingleProductRelatedItemsComponent {
  product!: Product;
  id: string = "";
  relatedProducts: Product[] = [];

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
            // 1) Get the current product
            this._ProductsService.getProductById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res) => {
                  this.product = res;

                  // 2) Now fetch related products
                  this._ProductsService.getRelatedProducts(
                    this.product.category || '',
                    this.product._id || ''
                  )
                    .pipe(takeUntil(this._destroy$))
                    .subscribe({
                      next: (related) => {
                        this.relatedProducts = related;
                      }
                    });
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
