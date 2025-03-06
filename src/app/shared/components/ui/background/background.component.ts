import { Component, Input } from '@angular/core';
import { RegButtonComponent } from '../reg-button/reg-button.component';

@Component({
  selector: 'app-background',
  imports: [RegButtonComponent],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
@Input() role !: string;
}
