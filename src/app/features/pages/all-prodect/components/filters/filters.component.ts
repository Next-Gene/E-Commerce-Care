import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../../core/interfaces/product';
import { Category } from '../../../../../core/interfaces/category';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];
  @Input() showFilters: boolean = false;
  @Output() filteredProductsChange = new EventEmitter<Product[]>();
  @Output() toggleFiltersEvent = new EventEmitter<void>();

  selectedCategory: string = 'all';
  selectedReview: string = 'all';
  selectedPriceRange: string = '';
  selectedDiscount: string = '';
  selectedDepartment: string = 'all';

  ngOnInit(): void {
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.applyFilters();
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
        // هنا يمكن تعديل منطق الفلترة للخصم إذا كان يحتاج للنطاق أو قيمة واحدة
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
