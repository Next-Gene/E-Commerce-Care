import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../core/interfaces/category';
import { CartComponent } from '../../../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { CategoriesService } from '../../../../../core/service/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-category',
  imports: [CartComponent, CommonModule],
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent implements OnInit, OnDestroy {
  // Store an array of products rather than a single product.
  products: Product[] = [];
  dcategory!: Category;
  id: string = "";
  
  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _CategoriesService = inject(CategoriesService);
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
            // Get the category details using the provided id.
            this._CategoriesService.getCategoryById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res: Category) => {
                  this.dcategory = res;
                  // Using the category _id, retrieve all products for this category.
                  // Ensure that the category _id exists.
                  if (this.dcategory._id &&this.dcategory.name) {
                    this._ProductsService.getProductsByCategory(this.dcategory.name)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe({
                      next: (products: Product[]) => {
                        this.products = products;
                      },
                      error: (err) => {
                        console.error('Error fetching products:', err);
                      }
                    });
                  
                  } else {
                    console.error('Category _id is undefined.');
                  }
                },
                error: (err) => {
                  console.error('Error fetching category:', err);
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
