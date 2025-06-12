import { Component, inject, OnInit } from '@angular/core';
import { CartComponent } from '../../../shared/components/ui/cart/cart.component';
import { Product } from '../../../core/interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/service/products.service';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CartComponent, CommonModule],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss',
})
export class BestSellerComponent implements OnInit {
  private _productsService = inject(ProductsService);
  private selectedProducts: Product[] | null = null;

  products: Product[] = [];
  getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  ngOnInit(): void {
    this._productsService.getAllProducts().subscribe((data: Product[]) => {
      this.products = this.getRandomProducts(data, 10);
    });
  }
}
