import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,

  imports: [
    TranslateModule,
    CurrencyPipe,
    DecimalPipe,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() currencyCode: string = 'USD';
  @Input() truncateCount: number = 3;
  resizeSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.adjustTruncateCount(window.innerWidth);
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(
      (event: Event) => {
        const width = (event.target as Window).innerWidth;
        this.adjustTruncateCount(width);
      }
    );
  }

  adjustTruncateCount(width: number): void {
    if (width <= 320 || width <= 768) {
      this.truncateCount = 2;
    } else {
      this.truncateCount = 3;
    }
  }
  getPriceAfterDiscount(product: Product): number {
    const discountPercent = 10; // خصم 10%
    if (!product.price) return 0;
    return product.price - (product.price * discountPercent) / 100;
  }

  calculateDiscount(product: Product): number {
    const discountPercent = 10; // نفس النسبة
    return discountPercent;
  }

  getStars(rate?: number): string[] {
    const validRate = rate ?? 0;
    const fullStars = Math.floor(validRate);
    const halfStar = validRate - fullStars >= 0.5 ? 1 : 0;
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
