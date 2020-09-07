import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsPromiseService {
  private productsURL = 'http://localhost:3000/products';
  //products: Observable<Array<Product>>;

  constructor(
    private http: HttpClient
  ) {}

  private handleError(error: any): Promise<any> {
    console.log(`An error occured: ${error}`);

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
    const url = `${this.productsURL}/${product.id}`;
    const body = JSON.stringify(product);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => response as Product)
      .catch(this.handleError);
  }
}
