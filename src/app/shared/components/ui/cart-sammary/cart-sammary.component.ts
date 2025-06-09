import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { CartServive } from '../../../../core/service/cart.service';
import { Cart } from '../../../../core/interfaces/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-sammary',
  standalone: true,
  imports: [TranslateModule, RouterLink, CommonModule],
  templateUrl: './cart-sammary.component.html',
  styleUrl: './cart-sammary.component.scss',
})
export class CartSammaryComponent implements OnInit, OnDestroy {
  cart: Cart | null = null;
  private destroy$ = new Subject<void>();

  constructor(private _CartService: CartServive) {}

  ngOnInit(): void {
    // Subscribe to cart updates
    this._CartService.cart$.pipe(takeUntil(this.destroy$)).subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
