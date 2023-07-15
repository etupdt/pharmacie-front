import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor (
    private productService: ProductService
  ) {}

  @Input() product!: Product
  @Output() addProductToCart: EventEmitter<Product> = new EventEmitter();

  backendImages = environment.useBackendImages

  set setDetail (detail: boolean) {this.productService.detail = detail}

}
