import { CategoriesService } from './../../../core/service/categories.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/service/products.service';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';
import { FiltersComponent } from './components/filters/filters.component';
import { Category } from '../../../core/interfaces/category';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '../../../shared/components/ui/pagination/pagination.component';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CartComponent,
    PaginationComponent,
    FiltersComponent,
  ],
  templateUrl: './all-prodect.component.html',
  styleUrls: ['./all-prodect.component.scss'],
})
export class AllProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = []; // القائمة الكاملة بعد التصفية
  showingProducts: Product[] = [];  // القائمة المقسمة حسب الصفحة الحالية
  showFilters: boolean = false;
  currentPage: number = 1;
  limitProducts: number = 12;
  totalPages: number = 1;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private viewportScroller: ViewportScroller,
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      // عند تحميل الصفحة نعتمد القائمة الكاملة كقائمة مبدئية للتصفية
      this.filteredProducts = [...this.products];
      this.calculatePagination();
      this.onPageChange(this.currentPage);
    });

    this._categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    document.body.style.overflow = this.showFilters ? 'hidden' : 'auto';
  }

  isMobile(): boolean {
    return window.innerWidth < 640;
  }

  // دالة حساب عدد الصفحات بناءً على طول القائمة المفلترة
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.limitProducts);
  }

  // دالة تحديث المنتجات الخاصة بالصفحة الحالية من القائمة المفلترة
  onPageChange(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.limitProducts;
    const endIndex = startIndex + this.limitProducts;
    this.showingProducts = this.filteredProducts.slice(startIndex, endIndex);
    if (isPlatformBrowser(this.platformId)) {
      this.viewportScroller.scrollToPosition([0, 0]);
    }
  }

  // دالة استقبال نتائج الفلترة من مكون الفلاتر
  handleFilteredProducts(filtered: Product[]): void {
    this.filteredProducts = filtered;
    this.calculatePagination();
    this.onPageChange(1);
  }
}
