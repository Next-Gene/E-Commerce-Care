import { Component } from '@angular/core';
import { CartSammaryComponent } from '../../../../../../shared/components/ui/cart-sammary/cart-sammary.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paymet',
  standalone: true,
  imports: [CartSammaryComponent, TranslateModule, CommonModule, RouterLink],
  templateUrl: './paymet.component.html',
  styleUrl: './paymet.component.scss',
})
export class PaymetComponent {
  paymentMethod: string = '';
  paymentOptions = [
    {
      type: 'delivery',
      label: 'Cash On Delivery',
      img: '/images/money.png',
    },
    {
      type: 'online',
      label: 'Pay With Credit Card',
      img: '/images/credit.png',
    },
  ];

  constructor(private router: Router, private toastr: ToastrService) {}

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  processPayment() {
    if (!this.paymentMethod) {
      this.toastr.error('Please select a payment method', 'Error');
      return;
    }

    // Navigate to form section with the selected payment method
    this.router.navigate(['/checkout/form'], {
      queryParams: { method: this.paymentMethod },
    });
  }
}
