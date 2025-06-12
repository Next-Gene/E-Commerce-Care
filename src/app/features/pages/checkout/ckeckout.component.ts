import { Component } from '@angular/core';
import { PaymetComponent } from './components/paymet/paymet.component';
import { FormComponent } from './components/form/form.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ckeckout',
  standalone: true,
  imports: [PaymetComponent, FormComponent, TranslateModule, CommonModule],
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

  showSection(sectionId: string) {
    this.selectedSection = sectionId;
  }
}
