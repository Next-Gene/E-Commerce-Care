import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartSammaryComponent } from '../../../../../../shared/components/ui/cart-sammary/cart-sammary.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OnlinepaymentService } from '../../../../../../core/services/onlinepayment.service';
import { ToastrService } from 'ngx-toastr';
import { OnlinePayment } from '../../../../../../core/interfaces/onlinepayment';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    CartSammaryComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  billingForm: FormGroup;
  paymentMethod: 'online' | 'delivery' | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private onlinePaymentService: OnlinepaymentService,
    private toastr: ToastrService,
  ) {
    this.billingForm = this.fb.group({
      shippingAddress: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{11}$/)],
        ],
        street: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,10}$/)]],
        state: ['', Validators.required],
      }),
      deliveryMethodId: [1],
      notes: [''],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.paymentMethod = params['method'] as 'online' | 'delivery';
    });
  }

  goToNextStep() {
    if (this.billingForm.valid) {
      if (this.paymentMethod === 'online') {
        this.processOnlinePayment();
      } else if (this.paymentMethod === 'delivery') {
        this.processDeliveryPayment();
      }
    } else {
      this.toastr.error(
        'Please fill in all required fields correctly',
        'Form Invalid'
      );
      this.markFormGroupTouched(this.billingForm);
    }
  }

  private processOnlinePayment() {
    const formValue = this.billingForm.value;
    const paymentData: OnlinePayment = {
      deliveryMethodId: formValue.deliveryMethodId,
      shippingAddress: formValue.shippingAddress,
      notes: formValue.notes,
    };

    this.onlinePaymentService.createOnlinePayment(paymentData).subscribe({
      next: () => {
        this.toastr.success(
          'Payment information saved successfully',
          'Success'
        );
        this.router.navigate(['/checkout/payment']);
      },
      error: (error) => {
        this.toastr.error('Failed to save payment information', 'Error');
        console.error('Payment error:', error);
      },
    });
  }

  private processDeliveryPayment() {
    const formValue = this.billingForm.value;
    const paymentData = {
      deliveryMethodId: formValue.deliveryMethodId,
      shippingAddress: formValue.ShippingAddress,
    };

 
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
