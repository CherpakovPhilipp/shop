import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import {
  AdminDashboardComponent,
  ManageProductsComponent,
  ManageOrdersComponent
} from './components';
import { AdminComponent } from './admin.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent, ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
