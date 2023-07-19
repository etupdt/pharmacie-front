import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  selectedLangage$!: string

  constructor (
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.listenSelectedLangage.subscribe((selectedLangage) => {this.selectedLangage$ = selectedLangage})
  }

}
