import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartComponent } from '../../../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesService } from '../../../../../core/service/categories.service';

@Component({
  selector: 'app-single-product-related-items',
  standalone: true,
  imports: [TranslateModule, CartComponent, CommonModule, RouterLink],
  templateUrl: './single-product-related-items.component.html',
  styleUrl: './single-product-related-items.component.scss',
})
export class SingleProductRelatedItemsComponent implements OnInit, OnDestroy {
  product!: Product;
  id: string = '';
  categoryId: string = '';
  relatedProducts: Product[] = [];
  category: string = ''; // initialize with empty string to avoid "undefined"

  private _Activatedroute = inject(ActivatedRoute);
  private _CategoriesService = inject(CategoriesService);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getParam();
  }

  getParam(): void {
    this._Activatedroute.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe((params) => {
        this.id = params.get('id') ?? '';
        if (!this.id) return;

        this._ProductsService.getProductById(this.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe((res) => {
            this.product = res;
            this.category = res.category ?? '';

            this._CategoriesService.getAllCategories()
              .pipe(takeUntil(this._destroy$))
              .subscribe((cats) => {
                const found = cats.find(c => c.name === this.category);
                this.categoryId = found?._id ?? '';

                this._ProductsService.getRelatedProducts(
                  this.category,
                  this.product._id ?? ''
                )
                .pipe(takeUntil(this._destroy$))
                .subscribe((related) => {
                  this.relatedProducts = related;
                });
              });
          });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
