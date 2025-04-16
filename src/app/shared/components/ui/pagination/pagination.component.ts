import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages!: number;
  @Input() currentPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  pages: (number | string)[] = [];

  ngOnChanges(): void {
    this.pages = this.getPages();
    this.totalPages = Math.ceil(this.totalPages);
  }

  getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const range = 2;

    if (this.totalPages <= 7) {
      return Array.from(
        { length: Math.ceil(this.totalPages) },
        (_, i) => i + 1
      );
    }

    pages.push(1);
    if (this.currentPage - range > 2) pages.push('...');

    for (
      let i = Math.max(2, this.currentPage - range);
      i <= Math.min(this.totalPages - 1, this.currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    if (this.currentPage + range < this.totalPages - 1) pages.push('...');
    pages.push(this.totalPages);

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
