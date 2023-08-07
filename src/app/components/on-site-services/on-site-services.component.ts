import { Component, OnInit } from '@angular/core';
import { OnSiteService } from 'src/app/entities/on-site-service';
import { OnSiteServiceService } from 'src/app/services/on-site-service.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-on-site-services',
  templateUrl: './on-site-services.component.html',
  styleUrls: ['./on-site-services.component.scss']
})
export class OnSiteServicesComponent implements OnInit {

  backendImages = environment.useBackendImages

  selectedLangage$!: string

  constructor (
    private onSiteServiceService: OnSiteServiceService,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private toastController: ToastController
  ) {
  }

  ngOnInit(): void {

    this.getPrestations();
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })

  }

  addOnSiteService = () => {
    this.router.navigateByUrl('VisiteurMenu/Prestation', {state: new OnSiteService().deserialize({
      id: 0,
      onSiteServiceName: '',
      description: '',
      price: 0,
      duree: 0,
      imagePath: ''
    })})
  }

  getPrestations = () => {

    this.onSiteServiceService.getOnSiteServices().subscribe({
      next: (res: any[]) => {
        res.forEach(p => {
          return this.onSiteServiceService.onSiteServices.push(new OnSiteService().deserialize(p))
        })
      },
        error: (error: { error: { message: any; }; }) => {
          this.presentToast('middle', error.error.message, 800)
        }
      }
    )

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }

  get getRole() {return this.authService.role}
  get getRefreshUpdate() {return this.onSiteServiceService.refreshUpdate}
  get getOnSiteServices() {return this.onSiteServiceService.onSiteServices}

}
