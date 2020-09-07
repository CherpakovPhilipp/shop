import { Product } from 'src/app/products/models/product.model';

export interface CartItem extends Product {
  quantity?: number;
  price?: number;
}
