import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
import { Product } from '../../../core/interfaces/product';
import { WishlistService } from '../../../core/service/wishlist.service';
import { LoadingService } from '../../../core/service/loading-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  private refreshSubject = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();
  private toastr = inject(ToastrService);

  loading = true;
  wishlistItems$: Observable<Product[]>;

  constructor(
    private wishlistService: WishlistService,
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
          map((response) => (response.items || []).map((item) => this.mapToProduct(item))),
          catchError((error) => {
            console.error('Error loading wishlist:', error);
            this.toastr.error('فشل تحميل العناصر من المفضلة', 'خطأ');
            return EMPTY;
          }),
          finalize(() => {
            setTimeout(() => {
              this.loading = false;
              this.loadingService.hide();
            });
          })
        )
      ),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  refreshWishlist(): void {
    this.refreshSubject.next();
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService
      .deleteItem(productId)
      .pipe(
        tap(() => {
          this.toastr.success('تمت إزالة المنتج من المفضلة', 'تم');
          this.refreshWishlist();
        }),
        catchError((error) => {
          console.error('Error removing wishlist item:', error);
          this.toastr.error('فشل في إزالة المنتج من المفضلة', 'خطأ');
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
