import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/classes/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  selectedLangage$!: string
  
  constructor (
    private productService: ProductService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })
  }

  @Input() product!: Product
  @Output() addProductToCart: EventEmitter<Product> = new EventEmitter();

  backendImages = environment.useBackendImages

  set setDetail (detail: boolean) {this.productService.detail = detail}

}
