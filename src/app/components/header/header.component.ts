import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  selectedLangage$!: string

  constructor (
    private router: Router,
    private productService: ProductService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {

    this.authService.listenSelectedTabIndex.subscribe((selectedTabIndex) => {this.selectedTabIndex$ = selectedTabIndex})
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })

    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
    this.onglets = this.router.config.filter(onglet => onglet.path !== '**')
    const selectedTabTime = localStorage.getItem('selectedTabTime')
    if (selectedTabTime && (new Date()).getTime() - +selectedTabTime < 180000) {
      this.authService.selectedTab = localStorage.getItem('selectedTab')!
    }
    this.authService.callRoute()
  }

  toggleCartPage = () => {
    console.log(this.authService.selectedTab, this.authService.lastSelectedTab)
    this.burgerMenu = false
    if (this.authService.selectedTab === 'Produits') {
      if (this.productService.detail && this.cart$.products.length !== 0)
        this.productService.detail = false
      if (this.cart$.display) {
        this.cart$.display = false;
        this.authService.selectedTab = this.authService.lastSelectedTab
        console.log(this.authService.selectedTab, this.authService.lastSelectedTab)
        this.authService.callRoute()
      } else if (this.cart$.products.length !== 0) {
        this.cart$.display = true;
        this.authService.lastSelectedTab = 'Produits'
      }
    } else {
      if (this.cart$.products.length !== 0) {
        this.cart$.display = true;
        this.authService.lastSelectedTab = this.authService.selectedTab
        this.authService.selectedTab = 'Produits';
        this.authService.callRoute()
      }
    }
  }

  callRoute = (target: number) =>  {
    this.productService.detail = false
    this.authService.lastSelectedTab = this.authService.selectedTab
    this.burgerMenu = false
    this.authService.callRoute(target)
  }

  setSelectedIndex = (index: number) => {
    this.authService.selectedTabIndex.next(index)
  }

  get getSelectedTabIndex () {return this.authService.selectedTabIndex}
}
