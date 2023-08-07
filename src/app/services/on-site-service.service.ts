import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import mockOnSiteServices from '../../assets/data/mockOnSiteServices.json'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OnSiteService } from '../entities/on-site-service';

@Injectable({
  providedIn: 'root'
})
export class OnSiteServiceService {

  refreshUpdate: number = 0
  signalRefresUpdateUpdated = signal(this.refreshUpdate)

  onSiteServices: OnSiteService[] = []

  constructor(
    private http: HttpClient,
  ) { }

  getOnSiteServices(): Observable<any> {

    return this.http.get(
      environment.useBackendApi + `/onsiteservice`,
    )

  }

  putOnSiteService(onSiteService: OnSiteService): Observable<any> {

    return this.http.put(
      environment.useBackendApi + `/onsiteservice/${onSiteService.getId}`,
      onSiteService
    )

  }

  postOnSiteService(onSiteService: OnSiteService): Observable<any> {

    return this.http.post(
      environment.useBackendApi + `/onsiteservice`,
      onSiteService
    )

  }

  deleteOnSiteService(id: number): Observable<any> {

    return this.http.delete(
      environment.useBackendApi + `/onsiteservice/${id}`,
    )

  }

}
