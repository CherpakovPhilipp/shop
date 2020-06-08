import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OrdersComponent } from './orders.component';
import { OrderItemComponent, OrdersListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      {
        path: ':id',
        component: OrderItemComponent
      },
      {
        path: '',
        component: OrdersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
  static components = [ OrdersComponent, OrderItemComponent, OrdersListComponent ];
 }