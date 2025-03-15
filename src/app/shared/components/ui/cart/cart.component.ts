import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Product } from '../../../../core/interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [TruncatePipe, CurrencyPipe, TitleCasePipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  product = input<Product>({});
}
