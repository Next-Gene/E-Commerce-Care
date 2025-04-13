import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../../core/service/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../core/interfaces/category';
import { PopularItemsComponent } from "../popular-items/popular-items.component";
import { CartComponent } from "../../../../../shared/components/ui/cart/cart.component";
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { FiltersComponent } from "../../../all-prodect/components/filters/filters.component";

@Component({
  selector: 'app-details-category',
  imports: [CartComponent],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss'
})
export class DetailsCategoryComponent {
  product!: Product;
  dcategory!: Category;
  id: string = "";
  private _ProductsService = inject(ProductsService);
  private _Activatedroute = inject(ActivatedRoute);
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
            this._ProductsService.getProductById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res) => {
                  this.product = res; }
                });
            
            this._CategoriesService.getCategoryById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res) => {
                  this.dcategory = res;
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
