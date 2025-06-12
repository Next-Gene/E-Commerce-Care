import { Component, OnInit } from '@angular/core';
import { DeliveryPaymentService } from '../../../core/service/delivery-payment.service';
import { DeliveryPaymentRes } from '../../../core/interfaces/deliverypaymentRes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-confirmed',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './order-confirmed.component.html',
  styleUrl: './order-confirmed.component.scss',
})
export class OrderConfirmedComponent implements OnInit {
  orderDetails: DeliveryPaymentRes | null = null;

  get tax(): number {
    return Number(
      ((this.orderDetails?.deliveryMethod?.price || 0) * 0.14).toFixed(2)
    );
  }

  get total(): number {
    return Number(
      (
        (this.orderDetails?.subtotal || 0) +
        (this.orderDetails?.deliveryMethod?.price || 0) +
        this.tax
      ).toFixed(2)
    );
  }

  constructor(private _deliveryPaymentService: DeliveryPaymentService) {}

  ngOnInit() {
    this._deliveryPaymentService.getDeliveryPaymentRes().subscribe({
      next: (res) => {
        this.orderDetails = res;
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
      },
    });
  }
}
