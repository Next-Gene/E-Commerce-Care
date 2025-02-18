import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegButtonComponent } from '../reg-button/reg-button.component';

@Component({
  selector: 'app-background',
  imports: [RegButtonComponent,RouterLink],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
@Input() role !: string;
}
