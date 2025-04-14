import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-sammary',
  imports: [TranslateModule,RouterLink],
  templateUrl: './cart-sammary.component.html',
  styleUrl: './cart-sammary.component.scss'
})
export class CartSammaryComponent {

}
