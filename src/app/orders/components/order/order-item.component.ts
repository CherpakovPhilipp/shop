import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrderItem } from '../../models';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem: OrderItem;

  @Output() setQuantity: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();
  @Output() removeFromOrder: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  constructor() { }

  ngOnInit(): void {
  }

  onSetQuantity(inputValue: number){
    this.orderItem.quantity = inputValue;
    this.setQuantity.emit(this.orderItem);
  }

  onRemoveFromOrder(){
    this.removeFromOrder.emit(this.orderItem);
  }
}
