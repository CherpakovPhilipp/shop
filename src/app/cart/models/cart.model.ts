import { Observable } from 'rxjs';

import { CartItem } from './cart-item.model';

export interface Cart {
    cartProducts: Array<CartItem>;
    totalQuantity: number;
    totalSum: number;
}

export interface CartObservable {
    cartProducts: Observable<CartItem[]>;
    totalQuantity: number;
    totalSum: number;
}
