import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { products } from './products';
import { Product } from '../models/product.model';
import { Categories } from '../enums/categories';

const productsObservable: Observable<Array<Product>> = of(products.sort((a, b) => {
  if (!a.isAvailable) { return 1; }
  if (!b.isAvailable) { return -1; }
}));

@Injectable({
  providedIn: 'root'
})
export class ProductsPromiseService {
  private productsURL = 'http://localhost:3000/products';
  products: Observable<Array<Product>> = productsObservable;

  constructor(
    private http: HttpClient
  ) {}

  private handleError(error: any): Promise<any> {
    console.log(`An error occured: ${error}`)
    return Promise.reject(error.message || error);
  }

  getProducts(): Promise<Array<Product>> {
    return this.http.get(this.productsURL)
      .toPromise()
      .then(response => response as Array<Product>)
      .catch(this.handleError)
  }

  getProduct(id: number): Promise<Product> {
    return this.http.get(`${this.productsURL}/${id}`)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError)
  }
  

  deleteProduct(product: Product): Promise<Product> {
    const url = `${this.productsURL}/${product.id}`

    return this.http.delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  addProduct(product: any) {
    const url = this.productsURL;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }

  updateProduct(product: Product) {

  }
}
