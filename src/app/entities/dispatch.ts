import { State } from "../enums/state";
import { Product } from "./product";

export class Dispatch {

  constructor (
    private id: number,
    private dispatchDate: string,
    private receptionDate: string,
    private products: Product[],
    private dispatchState: State
  ) {}

  get getId () { return this.id }
  set setId (id: number) {this.id = id}
  get getDispatchDate () { return this.dispatchDate }
  set setDispatchDate (dispatchDate: string) {this.dispatchDate = dispatchDate}
  get getReceptionDate () { return this.receptionDate }
  set setReceptionDate (receptionDate: string) {this.receptionDate = receptionDate}
  get getProducts () { return this.products }
  set setProducts (products: Product[]) {this.products = products}
  get getDispatchState () { return this.dispatchState }
  set setDispatchState (dispatchState: State) {this.dispatchState = dispatchState}

}
