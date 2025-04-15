import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../../../../core/interfaces/category';
import { CartComponent } from '../../../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { CategoriesService } from '../../../../../core/service/categories.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from "../../../../../shared/components/ui/pagination/pagination.component";

@Component({
  selector: 'app-details-category',
  imports: [CartComponent, CommonModule, PaginationComponent],
  templateUrl: './details-category.component.html',
  styleUrls: ['./details-category.component.scss']
})
export class DetailsCategoryComponent implements OnInit, OnDestroy {
  // Original full products array from the API
  products: Product[] = [];
  // Subset of products to display on the current page
  displayedProducts: Product[] = [];
  dcategory!: Category;
  id: string = "";
  
  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 12; // Adjust the page size as desired
  totalPages: number = 0;
  
  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _CategoriesService = inject(CategoriesService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getParam();
  }

  // Retrieves the category data and its products
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
                  // Ensure that the category _id exists.
                  if (this.dcategory._id && this.dcategory.name) {
                    this._ProductsService.getProductsByCategory(this.dcategory.name)
                    .pipe(takeUntil(this._destroy$))
                    .subscribe({
                      next: (products: Product[]) => {
                        this.products = products;
                        // Calculate total pages based on page size.
                        this.totalPages = Math.ceil(this.products.length / this.pageSize);
                        // Initialize displayed products for the first page.
                        this.updateDisplayedProducts();
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
  
  // Updates the displayedProducts based on the current page and page size
  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  // Handles page change events emitted by the pagination component
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedProducts();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
