import { Component } from '@angular/core';
import { PaymetComponent } from './components/paymet/paymet.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormComponent } from './components/form/form.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ckeckout',
  standalone: true,
  imports: [PaymetComponent, TranslateModule, FormComponent, CommonModule],
  templateUrl: './ckeckout.component.html',
  styleUrl: './ckeckout.component.scss',
})
export class CkeckoutComponent {
  selectedSection: string = 'payment';
  sections = [
    {
      type: 'payment',
      label: 'CHECKOUT_SECTIONS.PAYMENT_INFO',
    },
    {
      type: 'form',
      label: 'CHECKOUT_SECTIONS.BILLING_ADDRESS',
    },
  ];

  constructor(private router: Router) {
    // Subscribe to route changes to update selected section
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        if (url.includes('/checkout/payment')) {
          this.selectedSection = 'payment';
        } else if (url.includes('/checkout/form')) {
          this.selectedSection = 'form';
        }
      });
  }

  showSection(sectionId: string) {
    this.selectedSection = sectionId;
    // Update URL based on section
    if (sectionId === 'payment') {
      this.router.navigate(['/checkout/payment']);
    } else if (sectionId === 'form') {
      this.router.navigate(['/checkout/form']);
    }
  }
}
