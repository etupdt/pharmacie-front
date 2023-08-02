import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { EvenementsPageComponent } from './components/evenements-page/evenements-page.component';
import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';
import { ClientComponent } from './components/client/client.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { VisitorMenuComponent } from './components/visitor-menu/visitor-menu.component';
import { ClientMenuComponent } from './components/client-menu/client-menu.component';

const routes: Routes = [
  {
    path: 'VisiteurMenu',
    component: VisitorMenuComponent,
    data: {
      icon: 'archive',
    },
    children: [
      {
        path: 'Accueil',
        component: HomePageComponent,
        data: {
          icon: 'archive',
        }
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
        }
      },
      {
        path: 'Prestations',
        component: OnSiteServicesComponent,
        data: {
          icon: 'trash',
        }
      },
    ]
  },
  {
    path: 'ClientMenu',
    component: ClientMenuComponent,
    data: {
      icon: 'archive',
    },
    children: [
      {
        path: 'Compte',
        component: ClientComponent,
        data: {
          icon: 'mail',
        }
      },
      {
        path: 'Contact',
        component: ContactComponent,
        data: {
          icon: 'mail',
        }
      },
    ]
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
