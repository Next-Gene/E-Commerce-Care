import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APIOrderResponse, order } from '../../../core/interfaces/order';
import { OrdersService } from '../../../core/service/orders.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-orders',
  imports: [RouterLink,CommonModule,TruncatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  Orders: APIOrderResponse = [];
  private _OrdersService = inject(OrdersService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getallOrders();
  }

  getallOrders() {
    this._OrdersService.getAllOrders()
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res) => {
          this.Orders = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
