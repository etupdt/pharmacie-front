import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';

const routes: Routes = [
  {
    path: 'Accueil',
    component: HomePageComponent,
  },
  {
    path: 'Produits',
    component: ProductsComponent,
  },
  {
    path: 'Prestations',
    component: OnSiteServicesComponent,
  },
  {
    path: 'Contact',
    component: ContactComponent,
  },
  {
    path: 'Votre compte',
    component: AuthComponent,
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
