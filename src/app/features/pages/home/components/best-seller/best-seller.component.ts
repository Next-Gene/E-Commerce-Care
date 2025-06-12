import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Product } from '../../../../../core/interfaces/product';
import { ProductsService } from '../../../../../core/service/products.service';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../../../../../shared/components/ui/cart/cart.component';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,
    TranslateModule,
    CartComponent,
    RouterLink,
  ],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss',
})
export class BestSellerComponent implements OnInit {
  private _productsService = inject(ProductsService);
  carouselOptions: any;
  private selectedProducts: Product[] | null = null;

  products: Product[] = [];
  getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  ngOnInit(): void {
    this.croissant();
    this._productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = this.getRandomProducts(data, 10);
    });
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
      margin: 20,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
      },
      nav: false,
    };
  }
}
