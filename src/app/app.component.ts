import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartObservableService } from './cart/services/cart-obesrvable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('appTitle') heading: ElementRef<HTMLHeadingElement>;

  title = 'Devices Shop';
  cartTotalQuantity$: Observable<number> = this.cartObservableService.totalQuantity$;

  constructor(private cartObservableService: CartObservableService ) { }

  ngOnInit() {
    this.cartObservableService.getCartProducts(); // TODO: run this method only when totalQuantity$ doesn't exist
    this.cartObservableService.getTotalQuantity();
  }

  ngAfterViewInit() {
    this.heading.nativeElement.innerText = this.title;
  }
}
