import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APIOrderResponse, order } from '../../../core/interfaces/order';
import { OrdersService } from '../../../core/service/orders.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [RouterLink,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  Orders: APIOrderResponse = [];
private _OrdersService = inject(OrdersService)
  
    ngOnInit(): void {
      this.getallOrders();
    }
    getallOrders() {
      this._OrdersService.getAllOrders().subscribe({
  next: (res) => {
    this.Orders = res;
  },
  error: (err) => {
    console.error(err);
  }
});
  
    }

}
