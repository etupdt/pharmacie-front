import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  burgerMenu = false

  onglets!: Route[]

  cart$!: Cart

  selectedTabIndex$: number = 0

  constructor (
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.authService.selectedTabIndexObs.subscribe((selectedTabIndex) => {this.selectedTabIndex$ = selectedTabIndex})

    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
    this.onglets = this.router.config
    const selectedTabTime = localStorage.getItem('selectedTabTime')
    if (selectedTabTime && (new Date()).getTime() - +selectedTabTime < 180000) {
      this.authService.selectedTab = localStorage.getItem('selectedTab')!
    }
    this.callRoute()
  }

  toggleCartPage = () => {
    if (this.authService.selectedTab === 'Produits') {
      if (this.cart$.display) {
        this.cart$.display = false;
        this.authService.selectedTab = this.authService.lastSelectedTab
        console.log(this.authService.lastSelectedTab)
        this.callRoute()
      } else if (this.cart$.products.length !== 0) {
        this.cart$.display = true;
        this.authService.lastSelectedTab = 'Produits'
      }
    } else {
      if (this.cart$.products.length !== 0) {
        this.cart$.display = true;
        this.authService.lastSelectedTab = this.authService.selectedTab
        this.authService.selectedTab = 'Produits';
        this.callRoute()
      }
    }
  }

  callRoute = (target?: number) =>  {
    this.burgerMenu = false
    if (!isNaN(Number(target))) {
      this.authService.callRoute(target)
    }
    else
      this.authService.callRoute()

  }

  setSelectedIndex = (index: number) => {
    this.authService.selectedTabIndex = index
  }

}
