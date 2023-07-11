import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [
  {
    path: 'Accueil',
    component: AccueilComponent,
  },
  {
    path: 'Produits',
    component: ProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
