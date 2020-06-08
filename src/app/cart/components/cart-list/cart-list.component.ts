import { Component } from '@angular/core';

import { CartService } from 'src/app/cart/services/cart.service';
import { CartItem } from '../../models';
import { FieldsFilters, OrderFilters } from '../../enums';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  fieldFilters: any;
  orderFilters: any;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
    ) {
    this.orderFilters = Object.values(OrderFilters);
    this.fieldFilters = Object.values(FieldsFilters);
  }

  get cartProducts(): Array<CartItem> {
    return this.cartService.getCartProducts();
  }

  get totalSum(): number {
    return this.cartService.getTotalSum();
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  onIncreaseQuantity(product: CartItem){
    this.cartService.increaseQuantity(product);
  }

  onDecreaseQuantity(product: CartItem){
    this.cartService.decreaseQuantity(product);
  }

  onSetQuantity(product: CartItem){
    this.cartService.setQuantity(product);
  }

  onRemoveFromCart(product: CartItem) {
    this.cartService.removeProduct(product);
  }

  onMakeOrder(){
    this.ordersService.setProducts(this.cartProducts);
    this.router.navigate(['/orders']);
  }
}
