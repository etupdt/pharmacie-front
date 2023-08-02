import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Client } from 'src/app/entities/client';
import { Product } from 'src/app/entities/product';
import { DisplayCart } from 'src/app/interfaces/displayCart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  backendImages = environment.useBackendImages

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private clientService: ClientService
  ) { }

  ngOnInit(
  ) {

  }

  getCartTotal = () => {
    let total = 0
    this.productService.cart.detail.forEach(detail => total += detail.product.getPrice * detail.qte)
    return total
  }

  deleteCartProduct (product: Product) {
    const index = this.productService.cart.detail.findIndex(detail => detail.product.getId === product.getId)
    if (index !== -1) {
      if (this.productService.cart.detail[index].qte === 1) {
        this.productService.cart.detail.splice(index, 1)
      } else {
        this.productService.cart.detail[index].qte--
      }
    }
    if (this.productService.cart.detail.length === 0)
      this.back()
  }

  createCommand = () => {

    this.productService.sendMail({
      auth: this.clientService.client,
      command: this.productService.cart.detail
    }).subscribe({
      next: (res: any[]) => {
        this.productService.cart.detail = []
        this.productService.cart.display = false
      },
      error: (error: { error: { message: any; }; }) => {
      }
    })

  }

  back = () => {
    return this.modalCtrl.dismiss(null, 'return');
  }

  get getCart () {return this.productService.cart}
}
