import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/classes/brand';
import { Filter } from 'src/app/interfaces/filter.interface';
import { Cart } from 'src/app/interfaces/cart.interface';
import { ProductType } from 'src/app/enums/product-type';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Product[] = []
  brands: Brand[] = []
  productTypes: string[] = []
  cart$!: Cart
  brandsChecked: number[] = []
  typesChecked: number[] = []

  product!: Product

  backendImages = environment.useBackendImages

  filters: Filter[] = [
    {
      name: 'Prix',
      unit: '€',
      inf: 0,
      sup: 60,
      step: 5,
      startValue: 0,
      endValue: 60
    },
  ]

  refresh: number = 0

  constructor (
    private productService: ProductService,
    private brandService: BrandService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.authService.auth = this.authService.authInit

    for (let productType in ProductType) {
      if (isNaN(Number(productType)))
        this.productTypes.push(productType)
    }
    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})

    this.getBrands()

  }

  showDetail = (id: number) => {
    console.log(id)
    this.product = this.products.find(product => id === product.getId)!
    this.productService.detail = true
  }

  check = (id: number, array: number[]) => {
    const index = array.findIndex(arrayId => arrayId === id)
    if (index === -1)
      array.push(id)
    else
      array.splice(index, 1)
    this.refresh++
  }

  checked = (id: number, array: number[]) => {
    return array.findIndex(arrayId => arrayId === id) !== -1
  }

  addToCart = (product: Product) => {
    this.cart$.products.push(product)
  }

  getCartProductNumber = (product: Product) => {
    return this.cart$.products.filter(p => p.getId === product.getId).length
  }

  getCartTotal = () => {
    let total = 0
    this.cart$.products.forEach(product => total += product.getPrice)
    return total
  }

  deleteCartProduct (product: Product) {
    const index = this.cart$.products.findIndex(p => p.getId === product.getId)
    if (index > -1)
      this.cart$.products.splice(index, 1)
    if (this.getCartTotal() === 0)
      this.cart$.display = false;
    this.refresh++
  }

  getProducts = () => {

    this.productService.getProducts().subscribe({
      next: (res: any[]) => {
        res.forEach(p => {
          const brand = this.brands.find(brand => brand.getId === p.brand.id)
          return this.products.push(new Product(
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
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Erreur',
            message1: `Erreur lors de la lecture des produits`,
            message2: error.error.message,
            delai: 0
          }
        })
      }
    })

  }

  getBrands = () => {

    this.brandService.getBrands().subscribe({
      next: (res: any[]) => {
        res.forEach(b => {
          this.brands.push(new Brand(
            b.id,
            b.brandName,
            b.imagePath,
          ))
        })
        this.getProducts()
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Erreur',
            message1: `Erreur lors de la lecture des marques`,
            message2: error.error.message,
            delai: 0
          }
        })
      }
    })

  }

  sendMail = () => {

    let products: {qte: number, product: Product}[] = []

    this.products.forEach(product => {
      const qte = this.getCartProductNumber(product)
      if (qte > 0) {
        products.push({
          qte: qte,
          product: product
        })
      }
    })

    this.productService.sendMail({
      auth: this.authService.auth,
      command: products
    }).subscribe({
      next: (res: any[]) => {
        this.cart$.products = []
        this.cart$.display = false
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Information',
            message1: `La commande a été expédiée`,
            message2: '',
            delai: 2000
          }
        })
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Erreur',
            message1: `Erreur lors de la lecture des marques`,
            message2: error.error.message,
            delai: 0
          }
        })
      }
    })

  }

  get getAuth () {return this.authService.auth}
  get getDetail () {return this.productService.detail}

}
