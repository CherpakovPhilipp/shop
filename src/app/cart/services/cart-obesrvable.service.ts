import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, retry, publish, refCount, map, scan, tap, reduce, mergeAll, concatMap } from 'rxjs/operators';

import { Product } from 'src/app/products/models/product.model';
import { CartObservable } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';
import { products } from 'src/app/products/services/products';

@Injectable({
  providedIn: 'root'
})
export class CartObservableService {
  private cartURL = 'http://localhost:3000/cart';

  private cartProductsSubject = new BehaviorSubject([]);
  private totalQuantitySubject = new BehaviorSubject(0);
  private totalSumSubject = new BehaviorSubject(0);

  public cartProducts$: Observable<CartItem[]> = this.cartProductsSubject.asObservable();
  public totalQuantity$: Observable<number> = this.totalQuantitySubject.asObservable();
  public totalSum$: Observable<number> = this.totalSumSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  private handleError(err: HttpErrorResponse) {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }

    return throwError('Something went wrong, please try again later.');
  }

  getCartProducts(): void {
    this.http.get<CartItem[]>(this.cartURL)
      .pipe(
        retry(1),
        publish(),
        refCount(),
        catchError(this.handleError)
      )
      .subscribe(products =>
        this.cartProductsSubject.next(products)
      )
  }

  getTotalSum(): void {
    this.cartProducts$.subscribe(products => {
      const totalSum = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

      this.totalSumSubject.next(totalSum);
    });
  }

  getTotalQuantity(): void {
    this.cartProducts$.subscribe(products => {
      const totalQuantity = products.reduce((acc, curr) => acc + curr.quantity, 0);

      this.totalQuantitySubject.next(totalQuantity);
    });
  }

  private getProductIndex(product: Product): Observable<number> {
    return this.cartProducts$
      .pipe(
        map(products => ~products.findIndex(item => item.id === product.id))
      );
  }

  addProduct(product: Product) {
    const body = JSON.stringify({ ...product, quantity: 1 });
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<CartItem>(this.cartURL, body, options)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => this.getCartProducts());
  }

  setQuantity(product: CartItem, ) {
    let productToSend;
    const productIndex$ = this.getProductIndex(product);
    
    // if (!productIndex$ || this.cartProducts$[productIndex$].quantity < 0) {
    //   productToSend = { ...product, quantity: 0 };
    // } else {
    //   productToSend = product
    // }
    productToSend = product; // TODO: remove

    const body = JSON.stringify(productToSend);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put<CartItem>(`${this.cartURL}/${product.id}`, body, options)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => this.getCartProducts())
  }

  increaseQuantity(product: CartItem) {
    product = { ...product, quantity: product.quantity + 1 };

    return this.setQuantity(product);
  }

  decreaseQuantity(product: CartItem) {
    product = { ...product, quantity: product.quantity - 1 };

    return this.setQuantity(product);
  }

  removeProduct(product: Product) {
    return this.http.delete(`${this.cartURL}/${product.id}`)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => this.getCartProducts())
  }
};
