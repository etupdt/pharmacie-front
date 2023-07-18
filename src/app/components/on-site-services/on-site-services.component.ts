import { Component, OnInit } from '@angular/core';
import { OnSiteService } from 'src/app/classes/on-site-service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { OnSiteServiceService } from 'src/app/services/on-site-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-on-site-services',
  templateUrl: './on-site-services.component.html',
  styleUrls: ['./on-site-services.component.scss']
})
export class OnSiteServicesComponent implements OnInit {

  onSiteServices: OnSiteService[] = []

  constructor (
    private onSiteService: OnSiteServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOnSiteServices();
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
          ));
        })
      },
      error: (error: { error: { message: any; }; }) => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            type: 'Erreur',
            message1: `Erreur lors de la lecture des produits`,
            message2: error.error.message,
            delai: 0
          }
        })
      }
    })

  }

}
