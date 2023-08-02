import { Injectable } from '@angular/core';
import { Client } from '../entities/client';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email?: string
  roles?: string[]

  selectedTab: string = 'Accueil'
  lastSelectedTab: string = 'Accueil'
  selectedTabIndex = new BehaviorSubject<number>(0)
  listenSelectedTabIndex = this.selectedTabIndex.asObservable()

  selectedLangage = new BehaviorSubject<string>('fr')
  listenSelectedLangage = this.selectedLangage.asObservable()

  constructor(
    private http: HttpClient,
  ) { }

  login = (email: string, password: string): Observable<any> => {
    return this.http.get(            // a transformer en post avec un payload
      environment.useBackendApi + `/login`,
    )
  }

}
