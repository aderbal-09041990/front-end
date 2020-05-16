import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-page-not-autorized',
  templateUrl: './page-not-autorized.component.html',
  styleUrls: ['./page-not-autorized.component.css']
})
export class PageNotAutorized implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-100');
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-100');
  }

}
