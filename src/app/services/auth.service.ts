import { Injectable } from '@angular/core';
import { Auth } from '../classes/auth';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth!: Auth

  selectedTab: string = 'Accueil'
  lastSelectedTab: string = 'Accueil'
  selectedTabIndex: number = 0
  selectedTabIndexObs: Observable<number> = new Observable<number>()

  constructor(
    private router: Router,
  ) { }

  authInit = new Auth(0, 'marie.dubois@test.fr', 'Marie', 'Dubois', '1 rue de la Paix', '', '45000', 'BAYONNE')

  callRoute = (target?: number) => {

    if (!isNaN(Number(target))) {
      this.selectedTab = this.router.config[target!].path!
    }

    localStorage.setItem('selectedTab', `${this.selectedTab}`)
    localStorage.setItem('selectedTabTime', `${(new Date()).getTime()}`)

    this.router.navigate([this.selectedTab])

  }

}
