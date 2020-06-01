import { NgModule } from '@angular/core';

import { CartListComponent, CartItemComponent } from './components/index';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [SharedModule, CartRoutingModule],
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  exports: [CartListComponent]
})
export class CartModule {}
