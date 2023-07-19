
import { NgModule, ApplicationRef, DoBootstrap } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ProductsComponent } from './components/products/products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { AuthComponent } from './components/auth/auth.component';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './components/footer/footer.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { HomePageComponent } from './components/home-page/home-page.component';

//import { OnSiteServicesComponent } from './components/on-site-services/on-site-services.component';
import { EvenementsPageComponent } from './components/evenements-page/evenements-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    MessageDialogComponent,
    FilterProductPipe,
    AuthComponent,
    FormErrorComponent,
    FooterComponent,
    ProductComponent,
    ContactComponent,
    HomePageComponent,
<<<<<<< Updated upstream
=======
    OnSiteServicesComponent,
>>>>>>> Stashed changes
    EvenementsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    HttpClientModule
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap { 

  ngDoBootstrap(appRef: ApplicationRef): void {
    // Manually bootstrap the AppComponent
    // You can add your custom bootstrapping logic here if needed
    appRef.bootstrap(AppComponent);
  }


}
