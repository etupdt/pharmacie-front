import { Component, OnInit } from '@angular/core';
import { OnSiteService } from 'src/app/entities/on-site-service';
import { OnSiteServiceService } from 'src/app/services/on-site-service.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-on-site-services',
  templateUrl: './on-site-services.component.html',
  styleUrls: ['./on-site-services.component.scss']
})
export class OnSiteServicesComponent implements OnInit {

  onSiteServices: OnSiteService[] = []

  backendImages = environment.useBackendImages

  selectedLangage$!: string

  constructor (
    private onSiteService: OnSiteServiceService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.selectedLangage$ = selectedLangage
    })
    this.getOnSiteServices();
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })
}

  getOnSiteServices = () => {

    this.onSiteService.getOnSiteServices().subscribe({
      next: (res: any[]) => {
        res.forEach(p => {
          return this.onSiteServices.push(new OnSiteService(
            p.id,
            p.onSiteServiceName,
            p.description,
            p.price,
            p.duree,
            p.imagePath
          ));
        })
      },
      error: (error: { error: { message: any; }; }) => {
      }
    })

  }

  get getRole() {return this.authService.role}

}
