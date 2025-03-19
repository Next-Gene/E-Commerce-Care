import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartSammaryComponent } from "../../../../shared/components/ui/cart-sammary/cart-sammary.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, CartSammaryComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
 

}
