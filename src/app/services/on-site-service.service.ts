import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnSiteServiceService {

  constructor() { }

  getOnSiteServices(): Observable<any> {

    return of(this.mockOnSiteServices)

  }

  mockOnSiteServices: any[] = [
    {
      'id': 1,
      'onSiteServiceName': 'Soins du visage',
      'description': 'Votre peau est unique et mérite des soins visage adaptés. Découvrez notre gamme de soin visage composée de sérums, crèmes de visage, baumes à lèvres, masques et bien d\'autres produits pour une routine soin du visage adaptée à vos préoccupations cutanées.',
      'price': 32.45,
      'duree': 30,
      'imagePath': 'Soins_du_visage.jpg',
    },
    {
      'id': 2,
      'onSiteServiceName': 'Manucure',
      'description': 'C’est l’une des techniques de manucure les plus connues et la plus pratiquée ! La manucure classique commence par un nettoyage des ongles c’est-à-dire limer les ongles, polir les ongles, dégager les cuticules et hydrater la peau. Ensuite, on applique une base transparente afin de protéger votre ongle. Puis, c’est le moment du choix de la couleur ? ! Une voire deux couches de vernis sont appliquées avant de terminer par une couche de top coat qui prolongera la durée de vie de votre manucure. En salon ou en mode cocooning chez vous, à vous de choisir.',
      'price': 55.21,
      'duree': 45,
      'imagePath': 'Manucure.jpg',
    },
    {
      'id': 3,
      'onSiteServiceName': 'Massage facial japonais',
      'description': 'Ce soin alterne pressions, modelages, lissages, étirements, frictions, vibrations dans une chorégraphie presque solennelle. L\'effet lifting est immédiat après la séance, la peau est rebondie, le teint plus frais, l\'ovale du visage redessiné.',
      'price': 48.54,
      'duree': 30,
      'imagePath': 'Massage_facial_japonais.jpg',
    },
  ]

}
