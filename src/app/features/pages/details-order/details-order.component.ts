import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../core/service/orders.service';
import { CommonModule } from '@angular/common';
import { order } from '../../../core/interfaces/order';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-details-order',
  imports: [CommonModule],
  templateUrl: './details-order.component.html',
  styleUrl: './details-order.component.scss'
})
export class DetailsOrderComponent implements OnInit, OnDestroy {
  orders: order = {} as order;
  private _Activatedroute = inject(ActivatedRoute);
  private _OrdersService = inject(OrdersService);
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getOrderParam();
  }

  getOrderParam(): void {
    this._Activatedroute.paramMap
      .pipe(
        takeUntil(this._destroy$),
        switchMap(params => {
          const id = params.get('id') || '';
          return this._OrdersService.getOrderById(id);
        })
      )
      .subscribe({
        next: (res) => {
          this.orders = res;
          console.log('Order details loaded:', this.orders);
        },
        error: (err) => {
          console.error('Error loading order:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
