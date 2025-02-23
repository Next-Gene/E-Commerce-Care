import { Component, inject, input, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reg-button',
  imports: [],
  templateUrl: './reg-button.component.html',
  styleUrl: './reg-button.component.scss'
})
export class RegButtonComponent {
  private _router=inject(Router)
@Input() role !: string;
navigateToSignup() {
  this._router.navigate(['/register']);
}
navigateToLogin() {
  this._router.navigate(['/login']);
}

}
