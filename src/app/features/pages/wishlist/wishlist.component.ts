import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistServive } from '../../../core/service/wishlist.service';
import { LoadingService } from '../../../core/service/loading-service.service';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  finalize,
  map,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { WishlistItem } from '../../../core/interfaces/wishlist';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  private refreshSubject = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();
  private toastr = inject(ToastrService);

  loading = false;
  wishlistItems$: Observable<Product[]>;

  constructor(
    private wishlistService: WishlistServive,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.wishlistItems$ = this.initializeWishlistStream();
  }

  ngOnInit(): void {
    this.refreshWishlist();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private mapToProduct(item: WishlistItem): Product {
    return {
      id: item.id,
      name: item.productName,
      description: '',
      price: item.price,
      productBrand: item.brand,
      category: item.category,
      productPhotos: [{ id: item.id, url: item.pictureUrl, isMain: true }],
      photoUrl: item.pictureUrl,
    };
  }

  private initializeWishlistStream(): Observable<Product[]> {
    return this.refreshSubject.pipe(
      tap(() => {
        this.loading = true;
        this.loadingService.show();
      }),
      switchMap(() =>
        this.wishlistService.getItems().pipe(
          map((response) =>
            (response.items || []).map((item) => this.mapToProduct(item))
          ),
          catchError((error) => {
            console.error('Error loading wishlist:', error);
            this.toastr.error('Failed to load wishlist items', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              progressAnimation: 'increasing',
              easeTime: 300,
            });
            return EMPTY;
          }),
          finalize(() => {
            this.loading = false;
            this.loadingService.hide();
          })
        )
      ),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  refreshWishlist(): void {
    this.refreshSubject.next(undefined);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService
      .deleteItem(productId)
      .pipe(
        tap(() => {
          this.refreshWishlist();
          this.toastr.success('Item removed from wishlist', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
          });
        }),
        catchError((error) => {
          console.error('Error removing item from wishlist:', error);
          this.toastr.error('Failed to remove item from wishlist', 'Error', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
          });
          return EMPTY;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  navigateToHome(): void {
    this.router.navigate(['/All-prodect']);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/SingleProduct', productId]);
  }
}
