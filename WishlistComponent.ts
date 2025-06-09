import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WishlistServive } from '../../../core/service/wishlist.service';
import { LoadingService } from '../../../core/service/loading-service.service';
import { Product } from '../../../core/interfaces/product';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';
import { ToastrService } from 'ngx-toastr';
import { WishlistItem } from '../../../core/interfaces/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  private toastr = inject(ToastrService);
  private wishlistService = inject(WishlistServive);
  private router = inject(Router);
  private loadingService = inject(LoadingService);

  loading = false;
  wishlistItems: Product[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  ngOnDestroy(): void {}

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

  loadWishlist(): void {
    this.loading = true;
    this.loadingService.show();

    this.wishlistService.getItems().subscribe({
      next: (response) => {
        this.wishlistItems = (response.items || []).map((item) =>
          this.mapToProduct(item)
        );
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        this.toastr.error('Failed to load wishlist items', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
        });
      },
      complete: () => {
        this.loading = false;
        this.loadingService.hide();
      },
    });
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.deleteItem(productId).subscribe({
      next: () => {
        this.loadWishlist(); // Reload the wishlist after deletion
        this.toastr.success('Item removed from wishlist', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
        });
      },
      error: (error) => {
        console.error('Error removing item from wishlist:', error);
        this.toastr.error('Failed to remove item from wishlist', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
        });
      },
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/All-prodect']);
  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/SingleProduct', productId]);
  }
}
