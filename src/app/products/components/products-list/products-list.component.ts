import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Observable<Array<Product>>;

  isAdmin = true;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
  }

  onBuy(product: Product) {
    this.cartService.addProduct(product);
  }

  onDelete(product: Product) {
    this.productsService.deleteProduct(product);
  }

  onAdd() {
    const link = ['/admin/products/add'];

    this.router.navigate(link);
  }

  onEdit(product: Product) {
    const link = ['/admin/products/edit', product.id];

    this.router.navigate(link);
  }
}
