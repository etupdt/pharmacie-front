import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import mockOnSiteServices from '../../assets/data/mockOnSiteServices.json'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnSiteServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  getOnSiteServices(): Observable<any> {

//    return of(mockOnSiteServices)

    return this.http.get(
      environment.useBackendApi + `/onsiteservice`,
    )

  }

}
