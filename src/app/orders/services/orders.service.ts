import { Injectable } from '@angular/core';
import { OrdersList, OrderItem } from '../models';
import { CartItem } from 'src/app/cart/models';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersList: OrdersList = {
    orderProducts: [],
    totalQuantity: 0,
    totalSum: 0
  }

  constructor() { }

  setProducts( products: CartItem[] ){
    this.ordersList.orderProducts = [...products];
  }

  setQuantity(product: OrderItem){
    const productIndex = this.getProductIndex(product);
    if ( productIndex !== -1 ) {
      this.ordersList.orderProducts[productIndex].quantity = product.quantity;
    }
  }

  getProducts(){
    return this.ordersList.orderProducts;
  }

  getTotalSum(){
    return this.ordersList.orderProducts.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
  }

  getTotalQuantity(){
    return this.ordersList.orderProducts.reduce((acc, curr) => acc + curr.quantity, 0);
  }

  getProductIndex(product: OrderItem): number {
    return this.ordersList.orderProducts.findIndex(item => item.id === product.id);
  }

  removeProduct(product: OrderItem){
    this.ordersList.orderProducts = this.ordersList.orderProducts.filter(item =>item.id !== product.id);
  }

  clearOrders(){
    this.ordersList = {
      orderProducts: [],
      totalQuantity: 0,
      totalSum: 0
    }
  }
}
