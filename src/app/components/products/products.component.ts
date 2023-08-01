import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product';
import { ProductService } from 'src/app/services/product.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/entities/brand';
import { Filter } from 'src/app/interfaces/filter.interface';
import { Cart } from 'src/app/interfaces/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { ProductsType } from 'src/app/interfaces/products-type.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Product[] = []
  brands$: Brand[] = []
  productTypes$: ProductsType[] = []
  cart$!: Cart
  product!: Product

  backendImages = environment.useBackendImages

  refresh$: number = 0

  selectedLangage$!: string

  constructor (
    private productService: ProductService,
    private brandService: BrandService,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})

    this.brandService.listenBrands.subscribe((brands) => {this.brands$ = brands as Brand[]})
    this.brandService.listenProductTypes.subscribe((productTypes) => {this.productTypes$ = productTypes as ProductsType[]})
    this.brandService.listenRefresh.subscribe((refresh: number) => {this.refresh$ = refresh})

    this.getProducts()

  }

  async showDetail(product: Product) {
    this.product = product
    const modal = await this.modalCtrl.create({
      component: ProductComponent,
      componentProps: {
        product: product
      }
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

  getCartTotal = () => {
    let total = 0
    this.cart$.detail.forEach(detail => total += detail.product.getPrice * detail.qte)
    return total
  }

  getProducts = () => {

    this.productService.getProducts().subscribe({
      next: (res: any[]) => {
        let products: Product[] = []
        res.forEach(p => {
          const brand = this.brands$.find(brand => brand.getId === p.brand.id)
          products.push(new Product(
            p.id,
            p.productName,
            p.label,
            p.description,
            p.price,
            p.stock,
            brand!,
            p.imagePath,
            p.type
          ));
        })
        this.brandService.refresh.next(this.refresh$ + 1)
        this.products = products
      },
      error: (error: { error: { message: any; }; }) => {
      }
    })

  }

  onIonInfinite(ev: Event) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  get getAuth () {return this.authService.auth}
  get getDetail () {return this.productService.detail}
  get getFilters() {return this.productService.filters}

}
