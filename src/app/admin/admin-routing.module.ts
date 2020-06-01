import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { 
  AdminDashboardComponent, 
  ManageOrdersComponent, 
  ManageProductsComponent 
} from './components';
import { ProductsListComponent } from '../products';
import { ProductFormComponent } from '../admin/components/product-form/product-form.component';
import { AuthGuard, PoductResolveGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { 
        path: '', 
        component: AdminDashboardComponent 
      },
      // { 
      //   path: 'products', 
      //   component: ProductsListComponent,
      //   children: [
      //     { 
      //       path: 'add', 
      //       component: ProductFormComponent
      //     },
      //     { 
      //       path: 'edit/:id', 
      //       component: ProductFormComponent
      //     }
      //   ]
      // },
      { 
        path: 'products', 
        component: ProductsListComponent,
        pathMatch: 'full'
      },
      { 
        path: 'products/add', 
        component: ProductFormComponent,
        pathMatch: 'full'
      },
      { 
        path: 'products/edit/:id', 
        component: ProductFormComponent,
        pathMatch: 'full',
        resolve: {
          product: PoductResolveGuard
        }
      },
      { 
        path: 'orders', 
        component: ManageOrdersComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
