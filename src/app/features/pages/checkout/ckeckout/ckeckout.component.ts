import { Component } from '@angular/core';
import { PaymetComponent } from '../paymet/paymet.component';
import { FormComponent } from '../form/form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-ckeckout',
  imports: [PaymetComponent, FormComponent, TranslateModule],
  templateUrl: './ckeckout.component.html',
  styleUrl: './ckeckout.component.scss',
})
export class CkeckoutComponent {
  selectedSection: string = 'form';
  sections = [
    {
      type: 'form',
      label: 'CHECKOUT_SECTIONS.BILLING_ADDRESS',
    },
    {
      type: 'payment',
      label: 'CHECKOUT_SECTIONS.PAYMENT_INFO',
    },
  ];

  showSection(sectionId: string) {
    this.selectedSection = sectionId;
  }
}
