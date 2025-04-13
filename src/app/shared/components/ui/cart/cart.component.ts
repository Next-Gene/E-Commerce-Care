import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { CommonModule, CurrencyPipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,

  imports: [TruncatePipe, TranslateModule, CurrencyPipe, TitleCasePipe, DecimalPipe, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() currencyCode: string = 'USD';
  @Input() truncateCount: number = 3;
  resizeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.adjustTruncateCount(window.innerWidth);
    this.resizeSubscription = fromEvent(window, 'resize').subscribe((event: Event) => {
      const width = (event.target as Window).innerWidth;
      this.adjustTruncateCount(width);
    });
  }

  adjustTruncateCount(width: number): void {
    if (width <= 320 || width <= 768) {
      this.truncateCount = 2;
    } else {
      this.truncateCount = 3;
    }
  }

  calculateDiscount(product: Product): number {
    if (product.price == null || product.priceAfterDiscount == null || product.price === 0) {
      return 0;
    }
    return ((product.price - product.priceAfterDiscount) / product.price) * 100;
  }

  getStars(rate?: number): string[] {
    const validRate = rate ?? 0;
    const fullStars = Math.floor(validRate);
    const halfStar = (validRate - fullStars) >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars: string[] = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (halfStar) {
      stars.push('half');
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push('empty');
    }
    return stars;
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
