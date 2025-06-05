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
  categoryId: number | null = null;
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
    this._Activatedroute.paramMap.pipe(takeUntil(this._destroy$)).subscribe({
      next: (params) => {
        const paramId = params.get('id');
        if (!paramId) return;
        this.id = paramId;

        this._ProductsService
          .getProductById(this.id)
          .pipe(takeUntil(this._destroy$))
          .subscribe({
            next: (res) => {
              this.product = res;
              if (res.category) {
                this.category = res.category;
                this.loadRelatedProducts();
              }
            },
            error: (err) => {
              console.error('Error fetching product:', err);
            },
          });
      },
    });
  }

  private loadRelatedProducts(): void {
    this._CategoriesService
      .getAllCategories()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (categories) => {
          const foundCategory = categories.find(
            (c) => c.name === this.category
          );
          if (foundCategory) {
            this.categoryId = foundCategory.id;
  
            this._ProductsService
              .getRelatedProducts(this.category, String(this.product.id))
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (related) => {
                  this.relatedProducts = related;
                },
                error: (err) => {
                  console.error('Error fetching related products:', err);
                },
              });
          }
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
        },
      });
  }
  

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
