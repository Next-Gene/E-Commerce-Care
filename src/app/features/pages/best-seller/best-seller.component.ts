import { Component, OnInit } from '@angular/core';
import { CartComponent } from "../../../shared/components/ui/cart/cart.component";
import { Product } from '../../../core/interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-best-seller',
  imports: [CartComponent,CommonModule],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.scss'
})
export class BestSellerComponent implements OnInit {
  products: Product[] = [];

  ngOnInit(): void {
   const cached = localStorage.getItem('bestSellerProducts');
  if (cached) {
    this.products = JSON.parse(cached);
  } else {
    console.warn('No bestSellerProducts found in localStorage');
  }
  }
}
