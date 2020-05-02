import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    $('body').addClass('empty-layout bg-silver-100');
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    $('body').removeClass('empty-layout bg-silver-100');
  }

}
