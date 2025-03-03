import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Product } from '../../../../core/interfaces/product';

@Component({
  selector: 'app-cart',
  imports: [TruncatePipe, CurrencyPipe, TitleCasePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  product = input<Product>({});
}
