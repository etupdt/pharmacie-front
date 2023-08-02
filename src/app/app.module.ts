import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './components/products/products.component';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { EvenementsPageComponent } from './components/evenements-page/evenements-page.component';
import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './components/login/login.component';
import * as _ from 'lodash';
import { VisitorMenuComponent } from './components/visitor-menu/visitor-menu.component';
import { ClientMenuComponent } from './components/client-menu/client-menu.component';
import { ClientComponent } from './components/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsComponent,
    ProductComponent,
    FilterProductPipe,
    HeaderComponent,
    CartComponent,
    EvenementsPageComponent,
    OnSiteServicesComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    VisitorMenuComponent,
    ClientMenuComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

