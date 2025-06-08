import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistServive } from '../../../core/service/wishlist.service';
import { LoadingService } from '../../../core/service/loading-service.service';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, finalize, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs';
import { WishlistItem } from '../../../core/interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  private refreshSubject = new BehaviorSubject<void>(undefined);
  private destroy$ = new Subject<void>();
  
  loading = false;
  wishlistItems$: Observable<WishlistItem[]>;

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

  private initializeWishlistStream(): Observable<WishlistItem[]> {
    return this.refreshSubject.pipe(
      tap(() => {
        this.loading = true;
        this.loadingService.show();
      }),
      switchMap(() => this.wishlistService.getItems().pipe(
        map(response => response.items || []),
        catchError(error => {
          console.error('Error loading wishlist:', error);
          return EMPTY;
        }),
        finalize(() => {
          this.loading = false;
          this.loadingService.hide();
        })
      )),
      shareReplay(1),
      takeUntil(this.destroy$)
    );
  }

  refreshWishlist(): void {
    this.refreshSubject.next(undefined);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.deleteItem(productId).pipe(
      tap(() => this.refreshWishlist()),
      catchError(error => {
        console.error('Error removing item from wishlist:', error);
        return EMPTY;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/SingleProduct', productId]);
  }
} 