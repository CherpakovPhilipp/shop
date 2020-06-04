import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from 'src/app/products/models/product.model';
import { ProductsService, ProductsPromiseService } from 'src/app/products/services';
import { CartService } from 'src/app/cart/services/cart.service';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Promise<Array<Product>>;

  isAdmin = true;

  constructor(
    private productsService: ProductsService,
    private productsPromiseService: ProductsPromiseService,
    private cartService: CartService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.products = this.productsPromiseService.getProducts();
  }

  onBuy(product: Product) {
    this.cartService.addProduct(product);
  }

  onDelete(product: Product) {
    this.productsPromiseService.deleteProduct(product);
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
