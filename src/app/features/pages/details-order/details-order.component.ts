import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../core/service/orders.service';
import { CommonModule } from '@angular/common';
import { order } from '../../../core/interfaces/order';

@Component({
  selector: 'app-details-order',
  imports: [CommonModule],
  templateUrl: './details-order.component.html',
  styleUrl: './details-order.component.scss'
})
export class DetailsOrderComponent  implements OnInit{
  orders: order = {} as order;
 private _Activatedroute = inject(ActivatedRoute);
 private _OrdersService = inject(OrdersService);

ngOnInit(): void {
    this.getOrderParam();
}
 getOrderParam(): void {
      this._Activatedroute.paramMap.subscribe({
        next: (params) => {
        let id = params.get('id') || '';
        this._OrdersService.getOrderById(id).subscribe({
          next:(res)=>{
            console.log(res)
          },
          error:(err)=>{
            console.log(err)
          }
        })
        }
      

      })
  
}
}