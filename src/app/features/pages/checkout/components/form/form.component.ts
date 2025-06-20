import { Component, EventEmitter, Output } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartSammaryComponent } from '../../../../../shared/components/ui/cart-sammary/cart-sammary.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validsignup } from '../../../../../shared/utilites/validsignup';
import { CommonModule } from '@angular/common';
import { DeliveryPaymentService } from '../../../../../core/service/delivery-payment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OnlinePaymentService } from '../../../../../core/service/online-payment.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    CartSammaryComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  billingForm: FormGroup;
  paymentMethod: string = '';
  errormessage: string = '';
  @Output() sectionChange = new EventEmitter<string>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _deliveryPaymentService: DeliveryPaymentService,
    private _onlinePaymentService: OnlinePaymentService
  ) {
    this.billingForm = this._fb.group({
      deliveryMethodId: [],
      shippingAddress: this._fb.group({
        firstName: ['', validsignup.name],
        lastName: ['', validsignup.name],
        street: ['', validsignup.street],
        city: ['', validsignup.city],
        state: ['', validsignup.state],
        zipCode: ['', validsignup.zipCode],
        phoneNumber: ['', validsignup.phone],
        email: ['', validsignup.email],
      }),
      notes: [''],
    });
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      const method = this._deliveryPaymentService.getPaymentMethod();
      if (method === 'delivery' || method === 'online') {
        this.paymentMethod = method;
      } else {
        this._toastr.error('Please select a payment method first', 'Error');
        this._router.navigate(['/checkout/payment']);
      }
    });
  }
  @Output() backToPayment = new EventEmitter<void>();

  triggerBack() {
    this.backToPayment.emit();
  }
  goToNextStep() {
    if (!this.billingForm.valid) {
      this._toastr.error(
        'Please fill in all required fields correctly',
        'Error'
      );
      // Mark all fields as touched to show validation errors
      const shippingAddress = this.billingForm.get(
        'shippingAddress'
      ) as FormGroup;
      if (shippingAddress) {
        Object.keys(shippingAddress.controls).forEach((key) => {
          shippingAddress.get(key)?.markAsTouched();
        });
      }
      console.log('Form validation errors:', this.getFormValidationErrors());
      return;
    }

    switch (this.paymentMethod) {
      case 'online':
        this.processOnlinePayment();
        break;

      case 'delivery':
        this.processDeliveryPayment();
        break;

      default:
        this._toastr.error('Invalid payment method selected', 'Error');
        break;
    }
  }

  private getFormValidationErrors() {
    const errors: any = {};
    const shippingAddress = this.billingForm.get(
      'shippingAddress'
    ) as FormGroup;

    if (shippingAddress) {
      Object.keys(shippingAddress.controls).forEach((key) => {
        const control = shippingAddress.get(key);
        if (control?.errors) {
          errors[key] = control.errors;
        }
      });
    }
    return errors;
  }

  private processOnlinePayment() {
    const formValue = this.billingForm.value;
    const paymentData = {
      shippingAddress: {
        firstName: formValue.shippingAddress.firstName,
        lastName: formValue.shippingAddress.lastName,
        street: formValue.shippingAddress.street,
        city: formValue.shippingAddress.city,
        state: formValue.shippingAddress.state,
        zipCode: formValue.shippingAddress.zipCode,
        phoneNumber: formValue.shippingAddress.phoneNumber,
        email: formValue.shippingAddress.email,
      },
      deliveryMethodId: 2,
      notes: '',
    };
    this._onlinePaymentService.createOnlinePayment(paymentData).subscribe({
      next: (res: { url: string }) => {
        this._toastr.success('Redirecting to payment...', 'Success');
        window.location.href = res.url;
      },
      error: (err: HttpErrorResponse) => {
        this._toastr.error(err.error.message, 'Error');
        console.log(err.error.message);
      },
    });
  }

  private processDeliveryPayment() {
    const formValue = this.billingForm.value;
    const paymentData = {
      deliveryMethodId: 2,
      shippingAddress: {
        firstName: formValue.shippingAddress.firstName,
        lastName: formValue.shippingAddress.lastName,
        street: formValue.shippingAddress.street,
        city: formValue.shippingAddress.city,
        state: formValue.shippingAddress.state,
        zipCode: formValue.shippingAddress.zipCode,
        phoneNumber: formValue.shippingAddress.phoneNumber,
        email: formValue.shippingAddress.email,
      },
    };

    this._deliveryPaymentService.createDeliveryPayment(paymentData).subscribe({
      next: (res: any) => {
        this._toastr.success('Order placed successfully!', 'Success');
        this._router.navigate(['/order-confirmed']);
      },
    });
  }
}
