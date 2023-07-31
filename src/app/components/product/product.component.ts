import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/entities/product';
import { Cart } from 'src/app/interfaces/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product!: Product

  cart$!: Cart

  backendImages = environment.useBackendImages

  constructor (
    private productService: ProductService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit(): void {
    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
  }

  back = () => {
    return this.modalCtrl.dismiss(null, 'return');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Le panier est vide !',
      duration: 800,
      position: position,
    });

    await toast.present();
  }

  async showCart() {

    if (this.cart$.detail.length === 0) {
      this.presentToast("middle")
      return
    }

    const modal = await this.modalCtrl.create({
      component: CartComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }

  addProductToCart = (product: Product) => {
    const index = this.cart$.detail.findIndex(detail => detail.product.getId === product.getId)
    if (index !== -1)
      this.cart$.detail[index].qte++
    else
      this.cart$.detail.push({qte: 1, product: product})
  }

  get getCartTotalSize() {
    let total = 0
    this.cart$.detail.forEach(detail => total += detail.qte)
    return total === 0 ? '' : total
  }

  set setDetail (detail: boolean) {this.productService.detail = detail}

}
