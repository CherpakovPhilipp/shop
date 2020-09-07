import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';

import { Product } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Injectable({
  providedIn: 'any'
})
export class PoductResolveGuard implements Resolve<Product> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = +route.paramMap.get('id');

    if (!id) { return of({}); }

    return this.productsService.getProduct(id).pipe(
      map((product: Product) => {
        if (product) {
          return product;
        } else {
          this.router.navigate(['/products']);

          return of(null);
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/products']);

        return of(null);
      })
    );
  }
}
