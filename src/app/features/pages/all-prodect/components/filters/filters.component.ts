import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../../core/interfaces/product';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() showFilters: boolean = false;
  @Output() filteredProductsChange = new EventEmitter<Product[]>();
  @Output() toggleFiltersEvent = new EventEmitter<void>();

  categories: string[] = [];
  selectedCategory: string = 'all';
  selectedReview: string = 'all';
  selectedPriceRange: string = '';
  selectedDiscount: string = '';
  selectedDepartment: string = 'all';

  ngOnInit(): void {
    this.initializeCategories();
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.initializeCategories();
      this.applyFilters();
    }
  }

  initializeCategories(): void {
    if (this.products.length) {
      this.categories = Array.from(
        new Set(this.products.map(item => item.category).filter((cat): cat is string => cat !== undefined))
      );
    }
  }

  applyFilters(): void {
    const filtered = this.products.filter(product => {
      const matchCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      let matchReview = true;
      if (this.selectedReview !== 'all') {
        if (this.selectedReview.includes('-')) {
          const [min, max] = this.selectedReview.split('-').map(val => parseFloat(val));
          matchReview = (product.rate ?? 0) >= min && (product.rate ?? 0) <= max;
        } else {
          matchReview = (product.rate ?? 0) === parseFloat(this.selectedReview);
        }
      }
      let matchPrice = true;
      if (this.selectedPriceRange) {
        const [min, max] = this.selectedPriceRange.split('-').map(val => +val);
        matchPrice = (product.price ?? 0) >= min && (product.price ?? 0) <= max;
      }
      let matchDiscount = true;
      if (this.selectedDiscount && this.selectedDiscount !== 'all') {
        matchDiscount = (product.discount ?? 0) >= parseInt(this.selectedDiscount, 10);
      }
      return matchCategory && matchReview && matchPrice && matchDiscount;
    });
    this.filteredProductsChange.emit(filtered);
  }

  onToggleFilters(): void {
    this.toggleFiltersEvent.emit();
  }

  isMobile(): boolean {
    return window.innerWidth < 640;
  }
}
