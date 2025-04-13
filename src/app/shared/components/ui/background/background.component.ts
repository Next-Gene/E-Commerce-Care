import { Component, Input } from '@angular/core';
import { RegButtonComponent } from '../reg-button/reg-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-background',
  imports: [RegButtonComponent, TranslateModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
@Input() role !: string;
}
