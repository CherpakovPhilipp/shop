import { Component } from '@angular/core';

import { OrdersList, OrderItem } from '../../models';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {

  constructor(
    private ordersService: OrdersService
  ) { }

  get productsList(): OrderItem[]{
    return this.ordersService.getProducts();
  }
  get totalQuantity(): number {
    return this.ordersService.getTotalQuantity();
  }

  get totalSum(): number {
    return this.ordersService.getTotalSum();
  }

  onSetQuantity(product: OrderItem){
    this.ordersService.setQuantity(product);
  }

  onRemoveFromOrder(product: OrderItem){
    this.ordersService.removeProduct(product);
  }
}
