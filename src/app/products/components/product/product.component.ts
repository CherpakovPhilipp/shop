import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Product } from '../../models/product.model';
import { ProductsService, ProductsPromiseService } from 'src/app/products/services';
import { CartService } from 'src/app/cart/services/cart.service';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  @Output()
  buy: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  delete: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  edit: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private productsService: ProductsService,
    private productsPromiseService: ProductsPromiseService,
    private cartService: CartService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const observer = {
      next: (product: Product) => (this.product = { ...product })
    };

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('id') ? this.productsPromiseService.getProduct(+params.get('id')) : Promise.resolve(this.product);
      }
    )).subscribe(observer);
  }

  onBuy() {
    console.log(`"${this.product.name}" was added to Cart!`);

    if (this.route.snapshot.params.id) {
      this.cartService.addProduct(this.product);

      return;
    }

    this.buy.emit(this.product);
  }

  onDelete() {
    console.log(`"${this.product.name}" was deleted!`);

    this.delete.emit(this.product);
  }

  onEdit() {
    this.edit.emit(this.product);
  }
}
