import { Product } from 'src/app/products/models/product.model';

export interface OrderItem extends Product {
  quantity: number;
}
