import { NgModule } from '@angular/core';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [
    OrdersRoutingModule.components
  ],
  exports: [
    OrdersListComponent
  ]
})
export class OrdersModule {}