import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { Cart } from './interfaces/cart.interface';
import { ModalController, RangeCustomEvent, ToastController } from '@ionic/angular';
import { CartComponent } from './components/cart/cart.component';
import { environment } from 'src/environments/environment';
import { BrandService } from './services/brand.service';
import { Brand } from './entities/brand';
import { ProductType } from './enums/product-type';
import { ProductsType } from './interfaces/products-type.interface';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  cart$!: Cart

  brands$!: Brand[]
  productTypes$: ProductsType[] = []
  refresh$!: number

  priceChecked: boolean = false;
  brandsChecked: boolean = false;
  productTypesChecked: boolean = false;

  backendImages = environment.useBackendImages

  selectedLangage$!: string

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private productService: ProductService,
    private authService: AuthService,
    private brandService: BrandService,
    private translate: TranslateService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
    this.brandService.listenBrands.subscribe((brands) => {this.brands$ = brands as Brand[]})
    this.brandService.listenRefresh.subscribe((refresh: number) => {this.refresh$ = refresh})
    let index: number = 0
    for (let productTypeString in ProductType) {
      if (isNaN(Number(productTypeString))) {
        this.productTypes$.push({productType: index, productTypeString: productTypeString, checked: false})
        index++
      }
    }
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })
  }

  checkBrand = (index: number) => {
    this.brands$[index].checked= !this.brands$[index].checked
    this.brandService.brands.next(this.brands$)
    this.brandService.refresh.next(this.refresh$ + 1)
  }

  checkBrands = () => {
    this.brandsChecked = !this.brandsChecked
    this.brands$.forEach(brand => brand.checked = this.brandsChecked)
    this.brandService.brands.next(this.brands$)
    this.brandService.refresh.next(this.refresh$ + 1)
  }

  checkProductTypes = () => {
    this.productTypesChecked = !this.productTypesChecked
    this.productTypes$.forEach(productTypes => productTypes.checked = this.productTypesChecked)
    this.brandService.productTypes.next(this.productTypes$)
    this.brandService.refresh.next(this.refresh$ + 1)
  }

  checkType = (index: number) => {
    this.productTypes$[index].checked= !this.productTypes$[index].checked
    this.brandService.productTypes.next(this.productTypes$)
    this.brandService.refresh.next(this.refresh$ + 1)
  }

  onResetPrice = () => {
    this.getFilters[0].startValue = this.getFilters[0].inf
    this.getFilters[0].endValue = this.getFilters[0].sup
    this.brandService.refresh.next(this.refresh$ + 1)
    this.priceChecked = false
  }

  onTerminalsPriceChange = (event: Event) => {
    console.log((event as RangeCustomEvent).detail.value)
    this.getFilters[0].startValue = ((event as RangeCustomEvent).detail.value as {lower: number, upper: number}).lower
    this.getFilters[0].endValue = ((event as RangeCustomEvent).detail.value as {lower: number, upper: number}).upper
    this.brandService.refresh.next(this.refresh$ + 1)
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

  get getRoutes() {return this.router.config.filter(r => r.path !== '**')}
  get getActiveRoute() {return this.router.url.split('/')[1]}
  get getCartTotalSize() {
    let total = 0
    this.cart$.detail.forEach(detail => total += detail.qte)
    return total === 0 ? '' : total
  }
  get getFilters() {return this.productService.filters}

}
