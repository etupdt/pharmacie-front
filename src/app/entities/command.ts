import { State } from "../enums/state"
import { Dispatch } from "./dispatch"

export class Command {

  constructor (
    private id: number,
    private paymentDate: string,
    private dispatches: Dispatch[],
    private commandState: State
  ) {}

  get getId () { return this.id }
  set setId (id: number) {this.id = id}
  get getPaymentDate () { return this.paymentDate }
  set setPaymentDate (paymentDate: string) {this.paymentDate = paymentDate}
  get getDispatches () { return this.dispatches }
  set setDispatches (dispatches: Dispatch[]) {this.dispatches = dispatches}
  get getCommandState () { return this.commandState }
  set setCommandState (commandState: State) {this.commandState = commandState}

}
