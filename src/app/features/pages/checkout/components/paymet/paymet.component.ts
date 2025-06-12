import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CartSammaryComponent } from '../../../../../shared/components/ui/cart-sammary/cart-sammary.component';
import { DeliveryPaymentService } from '../../../../../core/service/delivery-payment.service';

@Component({
  selector: 'app-paymet',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink, CartSammaryComponent],
  templateUrl: './paymet.component.html',
  styleUrl: './paymet.component.scss',
})
export class PaymetComponent {
  @Output() sectionChange = new EventEmitter<string>();
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

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private deliveryPaymentService: DeliveryPaymentService
  ) {}

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  processPayment() {
    if (!this.paymentMethod) {
      this.toastr.error('Please select a payment method', 'Error');
      return;
    }

    if (this.paymentMethod !== 'delivery' && this.paymentMethod !== 'online') {
      this.toastr.error('Invalid payment method selected', 'Error');
      return;
    }

    // Store the selected payment method
    this.deliveryPaymentService.setPaymentMethod(this.paymentMethod);

    // Navigate to form section
    this.sectionChange.emit('form');
  }
}
