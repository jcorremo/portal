import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Step0Component } from './cart/step0/step0.component';
import { Step1Component } from './cart/step1/step1.component';
import { Step2Component } from './cart/step2/step2.component';
import { Step3Component } from './cart/step3/step3.component';
import {routesNames} from './routes.names';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'cart',
        component: CartComponent,
        children: [
          { path: '', component: Step0Component },
          { path: 'step-1', component: Step1Component },
          { path: 'step-2', component: Step2Component },
          { path: 'step-3', component: Step3Component }
        ]
      },
      {
        path: routesNames.CATEGORY,
        component: ProductListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
