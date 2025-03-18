import { Component } from '@angular/core';
import { CartSammaryComponent } from "../../../../shared/components/ui/cart-sammary/cart-sammary.component";

@Component({
  selector: 'app-paymet',
  standalone: true,
  imports: [CartSammaryComponent],
  templateUrl: './paymet.component.html',
  styleUrl: './paymet.component.scss'
})
export class PaymetComponent {
  paymentMethod: string = '';
  paymentOptions = [
    { type: 'cash', label: 'Cash On Delivery', img: '/money.png' },
    { type: 'card', label: 'Pay With Credit Card', img: '/credit.png' }
  ];

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

}
