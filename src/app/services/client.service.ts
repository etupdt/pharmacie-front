import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../entities/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientInit = new Client(0, '', '', '', '', '', '', '')

  client!: Client
  signalClientUpdated = signal(this.client)

  constructor(
    private http: HttpClient,
  ) {
    this.client = this.clientInit
    this.signalClientUpdated.set(this.clientInit)
  }

  getClient = (email: string): Observable<any> => {
    return this.http.get(
      environment.useBackendApi + `/client/${email}`,
    )
  }

  putClient = (client: Client): Observable<any> => {
    return this.http.put(
      environment.useBackendApi + `/client/${client.getId}`,
      client
    )
  }

}
