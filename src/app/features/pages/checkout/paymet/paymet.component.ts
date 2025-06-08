import { Component } from '@angular/core';
import { CartSammaryComponent } from "../../../../shared/components/ui/cart-sammary/cart-sammary.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-paymet',
  standalone: true,
  imports: [CartSammaryComponent, TranslateModule],
  templateUrl: './paymet.component.html',
  styleUrl: './paymet.component.scss'
})
export class PaymetComponent {
  paymentMethod: string = '';
  paymentOptions = [
    { type: 'cash', label: 'Cash On Delivery', img: 'images/money.png' },
    { type: 'card', label: 'Pay With Credit Card', img: 'images/credit.png' }
  ];

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

}
