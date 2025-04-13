import { CategoriesService } from './../../../core/service/categories.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product';
import { ProductsService } from '../../../core/service/products.service';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';
import { FiltersComponent } from './components/filters/filters.component';
import { Category } from '../../../core/interfaces/category';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, CartComponent, FiltersComponent],
  templateUrl: './all-prodect.component.html',
  styleUrls: ['./all-prodect.component.scss']
})
export class AllProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  showFilters: boolean = false;

  constructor(private _productsService: ProductsService,private _categoriesService:CategoriesService) {}

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = [...this.products];
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
}
