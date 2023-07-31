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
  ) {
  }

  ngOnInit(): void {

  }

  get getRoutes() {return this.router.config.filter(r => r.path !== '**')}
  get getActiveRoute() {return this.router.url.split('/')[1]}

}
