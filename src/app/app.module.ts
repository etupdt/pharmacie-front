import { NgModule } from '@angular/core';
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
import { AccueilComponent } from './components/accueil/accueil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FilterProductPipe } from './pipes/filter-product.pipe';
import { AuthComponent } from './components/auth/auth.component';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AccueilComponent,
    MessageDialogComponent,
    FilterProductPipe,
    AuthComponent,
    FormErrorComponent
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
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
