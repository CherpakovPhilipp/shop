import { Component, OnInit } from '@angular/core';

import { CartObservableService } from 'src/app/cart/services';
import { CartItem } from '../../models';
import { FieldsFilters, OrderFilters } from '../../enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  fieldFilters: any;
  orderFilters: any;

  cartProducts$: Observable<CartItem[]> = this.cartObservableService.cartProducts$;
  totalQuantity$: Observable<number> = this.cartObservableService.totalQuantity$;
  totalSum$: Observable<number> = this.cartObservableService.totalSum$;

  constructor(
    private cartObservableService: CartObservableService
  ) {
    this.orderFilters = Object.values(OrderFilters);
    this.fieldFilters = Object.values(FieldsFilters);
  }

  ngOnInit() {
    this.cartObservableService.getCartProducts();
    this.cartObservableService.getTotalSum();
    this.cartObservableService.getTotalQuantity();
  }

  onIncreaseQuantity(product: CartItem): void {
    this.cartObservableService.increaseQuantity(product);
  }

  onDecreaseQuantity(product: CartItem){
    this.cartObservableService.decreaseQuantity(product);
  }

  onSetQuantity(product: CartItem){
    this.cartObservableService.setQuantity(product);
  }

  onRemoveFromCart(product: CartItem) {
    this.cartObservableService.removeProduct(product);
  }
}
