import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reg-button',
  imports: [TranslateModule],
  templateUrl: './reg-button.component.html',
  styleUrl: './reg-button.component.scss',
})
export class RegButtonComponent {
  private _router = inject(Router);
  @Input() role!: string;
  navigateToSignup() {
    this._router.navigate(['/register']);
  }
  navigateToLogin() {
    this._router.navigate(['/login']);
  }
}
