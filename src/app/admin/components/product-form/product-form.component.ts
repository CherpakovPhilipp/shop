import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { pluck } from 'rxjs/operators';

import { Product } from 'src/app/products/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  product: Product;
  originalProduct: Product;

  constructor(
    private productsPromiseService: ProductsPromiseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      this.product = { ...product };
      this.originalProduct = { ...product };
    });
  }

  async onSaveProduct() {
    const product = { ...this.product };

    if (product.id) {
      await this.productsPromiseService.updateProduct(product);

      // optional parameter: http://localhost:4200/users;id=2
      this.router.navigate(['/products', { editedProductID: product.id }]);
    } else {
      await this.productsPromiseService.addProduct(product);
      
      this.onGoBack();
    }
    this.originalProduct = { ...this.product };
  }

  onGoBack() {
    this.router.navigate(['./../'], { relativeTo: this.route });
  }
}
