import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../core/service/products.service';
import { NEVER } from 'rxjs';
import { CartServiveService } from '../../../core/service/cart-servive.service';
import { cartItems } from '../../../core/interfaces/Cartitems';
import { CartSammaryComponent } from "../../../shared/components/ui/cart-sammary/cart-sammary.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartSammaryComponent ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {



  private _ProductsService = inject(ProductsService);

  ngOnInit(): void {
  
    this.getCartItems();
  }

  cartItems: cartItems[] = [];
  tableHeaders: string[] = ['Image', 'Title', 'Price', 'Quantity', 'Subtotal', 'Remove'];

  constructor(private _CartServiveService: CartServiveService) {}

  


  getCartItems() {
    this._CartServiveService.getProducts().subscribe(response => {
      this.cartItems = response.products.map((product: any) => ({
        ...product,
        quantity: 1,
        subTotal: product.priceAfterDiscount
      }));
    });

  }

  /** Fetch user's cart items and calculate subtotals & total **/
  // getUserCart() {
  //   this._checkoutService.getUserCart().subscribe(
  //     (res) => {
  //       this.cartData = res.cart;

  //       // Calculate `subTotal` for each item during initialization
  //       this.cartItems = res.cart.cartItems.map((product) => ({
  //         ...product,
  //         subTotal: product.product.price * product.quantity,
  //       }));
  //     },
  //     (err) => console.log(err)
  //   );
  // }

  // /** Handle increasing or decreasing quantity **/
  // updateQuantity(product: ICartProducts, change: number): void {
  //   const newQuantity = product.quantity + change;
  //   if (newQuantity < 1) return; // Prevent invalid values

  //   product.quantity = newQuantity;
  //   product.subTotal = product.product.price * product.quantity; // Recalculate subTotal
  //   this.updateCartQuantity(product);
  // }

  // /** Handle manual input change **/
  // onQuantityChange(product: ICartProducts): void {
  //   if (product.quantity < 1 || isNaN(product.quantity)) {
  //     product.quantity = 1; // Prevent invalid input
  //   }

  //   product.subTotal = product.product.price * product.quantity; // Update subTotal
  //   this.updateCartQuantity(product);
  // }

  // /** Call API to update quantity **/
  // updateCartQuantity(product: ICartProducts): void {
  //   if (!product?.product?.id) return;

  //   const data = { quantity: product.quantity };
  //   this._checkoutService
  //     .updateCartProductQuantity(product.product.id, data)
  //     .subscribe({
  //       next: () => console.log(`Updated quantity to ${product.quantity}`),
  //     });
  // }

  // /** Remove product from cart **/
  // RemoveProductFromCart(productId?: string): void {
  //   this._checkoutService.deleteProductFromCart(productId).subscribe({
  //     next: () => {
  //       console.log('Product removed from cart');
  //       this.getUserCart(); // Refresh cart after removal
  //     },
  //   });
  // }


}
