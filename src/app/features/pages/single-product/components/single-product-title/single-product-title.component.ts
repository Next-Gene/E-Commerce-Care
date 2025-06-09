import { Component, inject } from '@angular/core';
import { Product } from '../../../../../core/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../../../core/service/cart.service';
import { WishlistService } from '../../../../../core/service/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product-title',
  imports: [TranslateModule],
  templateUrl: './single-product-title.component.html',
  styleUrl: './single-product-title.component.scss',
})
export class SingleProductTitleComponent {
  product!: Product;
  id: string = '';
  isInWishlist: boolean = false;
  private toastr = inject(ToastrService);
  // Modal and rating variables
  showRatingModal: boolean = false;
  currentRating: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {
    // Get the product ID from route params
    this._Activatedroute.params.subscribe((params) => {
      this.id = params['id'];
      // Get product details
      this._ProductsService.getProductById(this.id).subscribe({
        next: (res) => {
          this.product = res;
          // Check if product is in wishlist
          this._WishlistService.getItems().subscribe({
            next: (wishlist) => {
              this.isInWishlist = wishlist.items.some(
                (item) => item.id === Number(this.id)
              );
            },
            error: (err) => {
              console.error('Error checking wishlist status:', err);
            },
          });
        },
      });
    });
  }

  private _destroy$ = new Subject<void>();
getphotos(){
this.product.productPhotos = this.product.productPhotos || [];

  const mainPhoto = this.product.productPhotos.find(p => p.isMain);
  this.product.photoUrl = mainPhoto ? mainPhoto.url : this.product.productPhotos[0]?.url;
}
  ngOnInit(): void {
    this.getParam();
      this.getphotos();
  }

  addToCart() {
    this._CartService.addItem(Number(this.id)).subscribe({
      next: (res) => {
        this.toastr.success('Item added to cart', 'Success', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing',
          easeTime: 300,
        });
      },
      error: (err) => {
        this.toastr.error('Failed to add item to cart', 'Error', {
          timeOut: 3000,
        });
      },
    });
  }

  addToWishlist() {
    if (this.isInWishlist) {
      // Remove from wishlist
      this._WishlistService.deleteItem(Number(this.id)).subscribe({
        next: (res) => {
          this.isInWishlist = false;
          this.toastr.error('Item removed from wishlist', 'Removed', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
          });
        },
        error: (err) => {
          this.toastr.error('Failed to remove item from wishlist', 'Error', {
            timeOut: 3000,
          });
        },
      });
    } else {
      // Add to wishlist
      this._WishlistService.addItem(Number(this.id)).subscribe({
        next: (res) => {
          this.isInWishlist = true;
          this.toastr.success('Item added to wishlist', 'Success', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
            progressAnimation: 'increasing',
            easeTime: 300,
          });
        },
        
      });
    }
  }

  getParam(): void {
    this._Activatedroute.paramMap.pipe(takeUntil(this._destroy$)).subscribe({
      next: (params) => {
        this.id = params.get('id') || '';
        if (this.id) {
          this._ProductsService
            .getProductById(this.id)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
              next: (res) => {
                this.product = res;
              },
            });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  changeMainImage(newImage: string) {
    this.product.photoUrl = newImage;
  }

}
