import { Product } from './../../../../../core/interfaces/product';
import { CategoriesService } from './../../../../../core/service/categories.service';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs'; 
import { CartComponent } from "../../../../../shared/components/ui/cart/cart.component";
import { ProductsService } from '../../../../../core/service/products.service';
import { Category } from '../../../../../core/interfaces/category';

@Component({
  selector: 'app-popular-items',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './popular-items.component.html',
  styleUrls: ['./popular-items.component.scss']
})
export class PopularItemsComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  allProducts: Product[] = [];
  products: Product[] = [];
  selectedCategoryIndex: number = 0;
  private _CategoriesService = inject(CategoriesService);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>(); 

  ngOnInit(): void {
    this.getCategories();
    this.getAllProducts();
  }
  getAllProducts(): void {
    this._ProductsService.getAllProducts()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.allProducts = res || [];
          if (this.categories.length > 0) {
            this.loadDefaultCategoryProducts();
          }
        },
        error: (err) => {
          console.error('Error fetching products', err);
        }
      });
  }
  getCategories(): void {
    this._CategoriesService.getAllCategories()
      .pipe(takeUntil(this._destroy$)) 
      .subscribe({
        next: (res) => {
          this.categories = (res || []).slice(0,4); // ضبط استجابة الفئات
          if (this.categories.length > 0) {
            this.loadDefaultCategoryProducts();
          }
        },
        error: (err: any) => {
          console.error('Error fetching categories', err);
        }
      });
  }

  loadDefaultCategoryProducts(): void {
    if (this.categories.length > 0) {
      this.onCategoryClick(this.categories[0], 0);
    }
  }

  onCategoryClick(category: Category, index: number): void {
    this.selectedCategoryIndex = index;
    // Filter products by category name
    this.products = this.allProducts.filter(
      (product) => product.category === category.name
    );
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
