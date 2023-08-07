import { Component, EventEmitter, Input, OnInit, Output, effect } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { OnSiteService } from 'src/app/entities/on-site-service';
import { AuthService } from 'src/app/services/auth.service';
import { OnSiteServiceService } from 'src/app/services/on-site-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-on-site-services-card',
  templateUrl: './on-site-services-card.component.html',
  styleUrls: ['./on-site-services-card.component.scss'],
})
export class OnSiteServicesCardComponent  implements OnInit {

  @Input() onSiteServiceCard!: OnSiteService
  @Input() displayIcon: string = 'cache'

  backendImages = environment.useBackendImages

  constructor(
    private authService: AuthService,
    private router: Router,
    private onSiteServiceService: OnSiteServiceService,
    private toastController: ToastController
  ) {
    effect(() => {
      this.onSiteServiceService.signalRefresUpdateUpdated()
    });
  }

  ngOnInit() {

  }

  updateOnSiteService = () => {
    this.router.navigateByUrl('VisiteurMenu/Prestation', {state: this.onSiteServiceCard})
  }

  deteteOnSiteService = (id: number) => {

    this.onSiteServiceService.deleteOnSiteService(id).subscribe({
      next: (res: any) => {
        this.presentToast('middle', 'La prestation a été suprimée', 800)
        this.onSiteServiceService.onSiteServices = this.onSiteServiceService.onSiteServices.filter(onSiteService => onSiteService.getId !== id)
      },
        error: (error: { error: { message: any; }; }) => {
      }
    })

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });

    await toast.present();
  }

  refresh = () => {
    this.onSiteServiceService.refreshUpdate++
    this.onSiteServiceService.signalRefresUpdateUpdated.set(this.onSiteServiceService.refreshUpdate)
  }

  get getRole() {return this.authService.role}
  get getMenuIndex() {return this.authService.menuIndex}
  get getMenuTabs() {return this.authService.menuTabs}
  get getRefreshUpdate() {return this.onSiteServiceService.refreshUpdate}

}
