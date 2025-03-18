import { Component } from '@angular/core';
import { PaymetComponent } from "../paymet/paymet.component";
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-ckeckout',
  imports: [PaymetComponent,FormComponent],
  templateUrl: './ckeckout.component.html',
  styleUrl: './ckeckout.component.scss'
})
export class CkeckoutComponent {
  selectedSection: string = 'form';
  sections = [
    { type: 'form', label: 'Your Billing Address' },
    { type: 'paymet', label: 'Your Payment Information' }
  ];
 
  showSection(sectionId: string) {
    this.selectedSection = sectionId;
  }
  
}

