import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  onglets!: Route[]

  constructor (
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onglets = this.router.config
  }

  callRoute = (target: number) =>  {
    this.productService.detail = false
    this.authService.lastSelectedTab = this.authService.selectedTab
    this.authService.callRoute(target)
  }

}
