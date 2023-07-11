import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/services/product.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Product[] = []

  backendImages = environment.useBackendImages

  constructor (
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: any[]) => {
        console.log(res)
        res.forEach(p => {
          this.products.push(new Product(
            p.id,
            p.productName,
            p.label,
            p.price,
            p.stock,
            p.brand,
            p.imagePath,
            p.type
          ))
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

}
