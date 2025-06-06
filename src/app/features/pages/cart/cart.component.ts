import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../core/service/products.service';
import { NEVER } from 'rxjs';
import { CartServiveService } from '../../../core/service/cart-servive.service';
import { Cart } from '../../../core/interfaces/Cartitems';
import { CartSammaryComponent } from '../../../shared/components/ui/cart-sammary/cart-sammary.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartSammaryComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private _ProductsService = inject(ProductsService);

  ngOnInit(): void {
    this.getCartItems();
  }

  cart!: Cart;
  tableHeaders: string[] = [
    'Image',
    'Title',
    'Price',
    'Quantity',
    'Subtotal',
    'Remove',
  ];

  constructor(private _CartServiveService: CartServiveService) {}

  getCartItems() {
    this._CartServiveService.getItems().subscribe({
      next: (res) => {
        this.cart = res;
      },
    });
  }

  
}
