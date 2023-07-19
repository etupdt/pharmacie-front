import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selectedLangage$!: string

  constructor (
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {
      console.log(selectedLangage)
      this.translate.use(selectedLangage);
      this.selectedLangage$ = selectedLangage
    })
  }

}
