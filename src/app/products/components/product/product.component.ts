import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Product } from '../../models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';
import { CartService } from 'src/app/cart/services/cart.service';

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

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const observer = {
      next: (product: Product) => (this.product = { ...product })
    };

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('id') ? this.productsService.getProduct(+params.get('id')) : Promise.resolve(this.product);
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
}
