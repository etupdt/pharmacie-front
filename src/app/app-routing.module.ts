import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';

//import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';
import { EvenementsPageComponent } from './components/evenements-page/evenements-page.component';


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
    path: 'Evenements',
    component: EvenementsPageComponent,
  },
  {
    path: 'Contact',
    component: ContactComponent,
  },
  {
    path: 'Votre compte',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
