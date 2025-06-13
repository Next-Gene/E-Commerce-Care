import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../../core/service/cart.service';
import { WishlistService } from '../../../../core/service/wishlist.service';
import { ToastrService } from 'ngx-toastr';

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
  @Input() currencyCode: string = 'EGP ';
  @Input() truncateCount: number = 3;
  @Input() isInWishlist: boolean = false;
  resizeSubscription: Subscription | undefined;
  private toastr = inject(ToastrService);

  constructor(
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.adjustTruncateCount(window.innerWidth);
    this.resizeSubscription = fromEvent(window, 'resize').subscribe(
      (event: Event) => {
        const width = (event.target as Window).innerWidth;
        this.adjustTruncateCount(width);
      }
    );
    // Only check wishlist status if not explicitly set
    if (this.isInWishlist === false) {
      this._WishlistService.getItems().subscribe({
        next: (wishlist) => {
          this.isInWishlist = wishlist.items.some(
            (item) => item.id === this.product.id
          );
        },
      });
    }
  }

  addToCart() {
    this._CartService.addItem(Number(this.product.id)).subscribe({
      next: (res) => {
        this.toastr.success('Item added to cart', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr animate__animated animate__fadeInUp',
        });
      },
      error: (err) => {
        let errorMessage = 'Failed to add item to cart';
        if (err.status === 409) {
          errorMessage = 'Item already in cart';
        }
        this.toastr.error(errorMessage, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr animate__animated animate__shakeX',
        });
      },
    });
  }

  addToWishlist() {
    if (this.isInWishlist) {
      // Remove from wishlist
      this._WishlistService.deleteItem(Number(this.product.id)).subscribe({
        next: (res) => {
          this.isInWishlist = false;
          this.toastr.error('Item removed from wishlist', 'Removed', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__shakeX',
          });
        },
        error: (err) => {
          this.toastr.error('Failed to remove item from wishlist', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__shakeX',
          });
        },
      });
    } else {
      // Add to wishlist
      this._WishlistService.addItem(Number(this.product.id)).subscribe({
        next: (res) => {
          this.isInWishlist = true;
          this.toastr.success('Item added to wishlist', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__fadeInRight',
          });
        },
        error: (err) => {
          this.toastr.error('Failed to add item to wishlist', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr animate__animated animate__shakeX',
          });
        },
      });
    }
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
