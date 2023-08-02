import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DisplayCart } from '../interfaces/displayCart.interface';
import { MailCommand } from '../interfaces/mail-command.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../interfaces/filter.interface';
import { ProductsType } from '../interfaces/products-type.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart: DisplayCart = {
    display: false,
    detail: []
  }

  productTypes: ProductsType[] = []

  refresh: number = 0

  detail = false

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

  constructor(
    private http: HttpClient,
  ) { }

  getProducts = (): Observable<any> => {

//    return of(mockProducts)

    return this.http.get(
      environment.useBackendApi + `/product`,
    )

  }

  sendMail = (mail: MailCommand): Observable<any> => {
    return this.http.post(
      environment.useBackendMail + `/sendmail/command`,
      mail
    )
  }

}
