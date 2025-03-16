import { Subject, takeUntil } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Product } from '../../../../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from "../../../../../shared/components/ui/cart/cart.component";
import { SingleProductTitleComponent } from "../../../../../shared/components/ui/single-product-title/single-product-title.component";
import { SingleProductInformationComponent } from "../../../../../shared/components/ui/single-product-information/single-product-information.component";
import { SingleProductRatingComponent } from "../../../../../shared/components/ui/single-product-rating/single-product-rating.component";

@Component({
  selector: 'app-single-product',
  imports: [CarouselModule, CommonModule, CartComponent, SingleProductTitleComponent, SingleProductInformationComponent, SingleProductRatingComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {
  product!: Product;
  id: string = "";
  relatedProducts: Product[] = [];

  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getParam();
  }

  getParam(): void {
    this._Activatedroute.paramMap
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (params) => {
          this.id = params.get('id') || '';
          if (this.id) {
            // 1) Get the current product
            this._ProductsService.getProductById(this.id)
              .pipe(takeUntil(this._destroy$))
              .subscribe({
                next: (res) => {
                  this.product = res;

                  // 2) Now fetch related products
                  this._ProductsService.getRelatedProducts(
                    this.product.category || '',
                    this.product._id || ''
                  )
                  .pipe(takeUntil(this._destroy$))
                  .subscribe({
                    next: (related) => {
                      this.relatedProducts = related;
                    }
                  });
                }
              });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


 
  }


