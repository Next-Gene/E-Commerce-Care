import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServive } from '../../../core/service/cart.service';
import { Cart, CartItem } from '../../../core/interfaces/cart';
import { RouterLink } from '@angular/router';
import { CartSammaryComponent } from '../../../shared/components/ui/cart-sammary/cart-sammary.component';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  EMPTY,
  Subject,
  catchError,
  finalize,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CartSammaryComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private refreshSubject = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();

  cart: Cart | null = null;
  tableHeaders: string[] = [
    'Product',
    'Name',
    'Price',
    'Quantity',
    'Subtotal',
    '',
  ];
  private toastr = inject(ToastrService);

  constructor(private cartService: CartServive) {
    // Initialize cart data stream
    this.refreshSubject
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() =>
          this.cartService.getItems().pipe(
            catchError((error) => {
              console.error('Error loading cart:', error);
              this.toastr.error('Failed to load cart items', 'Error');
              return EMPTY;
            })
          )
        )
      )
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnInit(): void {
    this.refreshCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshCart(): void {
    this.refreshSubject.next(undefined);
  }

  loadCart(): void {
    this.refreshCart();
  }

  deleteItem(productId: number): void {
    this.cartService
      .deleteItem(productId)
      .pipe(
        tap(() => {
          this.refreshCart();
        }),
        catchError((error) => {
          console.error('Error removing item:', error);
          this.toastr.error('Failed to remove item from cart', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  incrementQuantity(item: CartItem): void {
    if (item.quantity >= 99) {
      this.toastr.warning('Maximum quantity reached', 'Warning');
      return;
    }

    this.cartService
      .updateItem(item.id, item.quantity + 1)
      .pipe(
        tap(() => {
          this.refreshCart();
        }),
        catchError((error) => {
          console.error('Error updating quantity:', error);
          this.toastr.error('Failed to update quantity', 'Error');
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity <= 1) {
      this.toastr.warning('Minimum quantity reached', 'Warning');
      return;
    }

    this.cartService
      .updateItem(item.id, item.quantity - 1)
      .pipe(
        tap(() => {
          this.refreshCart();
        }),
        catchError((error) => {
          console.error('Error updating quantity:', error);
          this.toastr.error('Failed to update quantity', 'Error');
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
