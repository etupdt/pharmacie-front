import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../entities/product';
import { Cart } from '../interfaces/cart.interface';
import { MailCommand } from '../interfaces/mail-command.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Filter } from '../interfaces/filter.interface';
import mockProducts from '../../assets/data/mockProducts.json'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cart = new BehaviorSubject<Cart>({
    display: false,
    detail: []
  })
  listenCart = this.cart.asObservable()

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
