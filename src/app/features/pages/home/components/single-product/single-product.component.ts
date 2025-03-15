import { Subject } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../core/service/products.service';
import { Product } from '../../../../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartComponent } from "../../../../../shared/components/ui/cart/cart.component";

@Component({
  selector: 'app-single-product',
  imports: [CarouselModule, CommonModule, CartComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {
  carouselOptions: any;
  product!: Product;
  id: string = "";
  
  // Modal and rating variables
  showRatingModal: boolean = false;
  currentRating: number = 0;

  private _Activatedroute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getpram();
    this.croissant();
  }

  getpram(): void {
    this._Activatedroute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id') || '';
        if (this.id) {
          this._ProductsService.getProductById(this.id).subscribe({
            next: (res) => {
              this.product = res;
            },
          });
        }
      }
    });
  }

  increase(product: any): void {
    product.quantity++;
  }

  decrease(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  croissant(): void {
    this.carouselOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      autoplay: true,
      autoplayTimeout: 2000,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      },
      nav: false,
    };
  }

  // Modal control methods
  toggleRatingModal(): void {
    this.showRatingModal = !this.showRatingModal;
  }

  setRating(star: number): void {
    this.currentRating = star;
  }

  submitRating(): void {
    console.log('Rating submitted:', this.currentRating);
    // Add your submission logic here (e.g., call an API with the rating)
    this.toggleRatingModal();
  }
}