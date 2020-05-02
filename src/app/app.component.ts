import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Helpers } from './helpers';

import { Layout } from './model/layout';
import { RequestService } from './service/request/request.service';
import { LocalStorageService } from './service/local-storage/local-storage.service';
import { AlertService } from './core/alert/alert.service';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{

  title = 'front-end';
  layout: Layout = new Layout();
  interval: any;

  constructor(private _router: Router,
    private requestService:RequestService,
    private localStorageService:LocalStorageService,
    private alertService:AlertService) { }

  ngOnInit() {
    this.inicializar();
  }

  inicializar(){
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        Helpers.setLoading(true);
        Helpers.bodyClass('fixed-navbar');
      }
      if (route instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        Helpers.setLoading(false);
        Helpers.initPage();
      }
    });
  }

  salvarLayout() {

    if (this.layout != null) {

      this.requestService.post("/layout/save", JSON.stringify(this.layout))
        .subscribe(
          response => {
            Helpers.montaTema(this.layout);
          },
          error => {
            this.alertService.error(error.message);
          }
        );
    }
    this.themaConfigFixed();
  }

  getLayout() {

    const id = this.localStorageService.getIdLayuot();

    if (id != undefined) {
      this.requestService.get(
        '/layout/find/by/' + id)
        .subscribe(
          response => {
            this.layout = response as Layout;
            this.inicializar();
            Helpers.montaTema(this.layout);
          }
        );
    }
  }

  themaConfigFixed(){
    Helpers.carregaConfig(this.layout);
  }

}
