import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LoadingService } from './loading.service';

@Component({
  selector:'app-loading',
  templateUrl:'./loading.component.html',
  styleUrls:['loading.component.css']
})
export class LoadingComponent implements OnInit,AfterContentChecked{

  loading$ : Observable<string>;

  constructor(private loadingService:LoadingService,
    private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loading$ = this.loadingService.getLoading().pipe(
      map(loadingType => loadingType.valueOf())
    );
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }

}
