import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/entities/product';
import { Cart } from 'src/app/interfaces/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent  implements OnInit {

  cart$!: Cart

  backendImages = environment.useBackendImages

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit(
  ) {
    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
  }

  getCartTotal = () => {
    let total = 0
    this.cart$.detail.forEach(detail => total += detail.product.getPrice * detail.qte)
    return total
  }

  deleteCartProduct (product: Product) {
    const index = this.cart$.detail.findIndex(detail => detail.product.getId === product.getId)
    if (index !== -1) {
      if (this.cart$.detail[index].qte === 1) {
        this.cart$.detail.splice(index, 1)
      } else {
        this.cart$.detail[index].qte--
      }
    }
    if (this.cart$.detail.length === 0)
      this.back()
  }

  sendMail = () => {

    let products: {qte: number, product: Product}[] = []

    this.productService.sendMail({
      auth: this.authService.auth,
      command: this.cart$.detail
    }).subscribe({
      next: (res: any[]) => {
        this.cart$.detail = []
        this.cart$.display = false
      },
      error: (error: { error: { message: any; }; }) => {
      }
    })

  }


  back = () => {
    return this.modalCtrl.dismiss(null, 'return');
  }

}
