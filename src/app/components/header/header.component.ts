import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  burgerMenu = 'cache'

  selectedTabIndex: number = 0

  onglets!: Route[]

  cart$!: Cart

  constructor (
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.listenCart.subscribe((cart) => {this.cart$ = cart as Cart})
    this.onglets = this.router.config
    const selectedTabIndexTime = localStorage.getItem('selectedTabIndexTime')
    if (selectedTabIndexTime && (new Date()).getTime() - +selectedTabIndexTime < 180000)
      this.selectedTabIndex = +localStorage.getItem('selectedTabIndex')!
    this.callRoute()
  }

  callRoute = (target?: string) => {

    localStorage.setItem('selectedTabIndex', `${this.selectedTabIndex}`)
    localStorage.setItem('selectedTabIndexTime', `${(new Date()).getTime()}`)

    this.burgerMenu = 'cache'
    if (target)
      this.router.navigate([target])
    else
      this.router.navigate([this.router.config[this.selectedTabIndex].path])

  }

}
