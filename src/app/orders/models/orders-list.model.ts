import { OrderItem } from './order-item.model';

export interface OrdersList {
    orderProducts: Array<OrderItem>;
    totalQuantity: number;
    totalSum: number;
}
