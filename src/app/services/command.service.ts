import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Command } from '../entities/command';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dispatch } from '../entities/dispatch';
import { DispatchLine } from '../entities/dispatch-line';
import { DisplayCart } from '../interfaces/displayCart.interface';
import { State } from '../enums/state';
import * as _ from 'lodash';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private http: HttpClient,
    private clientService: ClientService
  ) { }

  postCommand = (cart: DisplayCart): Observable<any> => {

    let dispatchLines: DispatchLine[] = []
    cart.detail.forEach(detail => {
      dispatchLines.push(new DispatchLine(
        0,
        detail.product,
        detail.product.getPrice,
        detail.qte
      ))
    })

    let dispatchGroup = _.groupBy(dispatchLines, 'product.deliveryTime')

//    console.log(dispatchGroup)

    let dispatches: Dispatch[] = []
    Object.entries(dispatchGroup).forEach(([key, value], index) => {
      dispatches.push(new Dispatch(
        0,
        '2023-07-31',
        '2023-07-31',
        value,
        State.PAYEE
      ))
    })

//    console.log(dispatches)

    let command = new Command(
      0,
      '2023-07-31',
      dispatches,
      State.PAYEE,
      this.clientService.client
    )

    console.log(command)

    return this.http.post(
      environment.useBackendApi + `/command`,
      command
    )

  }

}
