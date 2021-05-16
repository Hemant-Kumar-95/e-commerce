import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductsListComponent } from './components/products-list/products-list.component';



const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent
  },
  {
    path: 'products/:id',
    component: ProductDescriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
