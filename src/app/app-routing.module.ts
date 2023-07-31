import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { EvenementsPageComponent } from './components/evenements-page/evenements-page.component';
import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';
import { AuthComponent } from './components/auth/auth.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: 'Accueil',
    component: HomePageComponent,
    data: {
      icon: 'archive',
    },
    pathMatch: 'full'
  },
  {
    path: 'Produits',
    component: ProductsComponent,
    data: {
      icon: 'paper-plane',
    },
    children: [
      {
        path: 'Produit',
        component: ProductComponent,
      }
    ]
  },
  {
    path: 'Evenements',
    component: EvenementsPageComponent,
    data: {
      icon: 'trash',
    },
    pathMatch: 'full'
  },
  {
    path: 'Prestations',
    component: OnSiteServicesComponent,
    data: {
      icon: 'trash',
    },
    pathMatch: 'full'
  },
  {
    path: 'Compte',
    component: AuthComponent,
    data: {
      icon: 'mail',
    },
    pathMatch: 'full'
  },
  {
    path: 'Contact',
    component: ContactComponent,
    data: {
      icon: 'mail',
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Accueil',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
