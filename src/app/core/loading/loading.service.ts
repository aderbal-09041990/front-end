import { Injectable } from '@angular/core';
import { startWith, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LoadingType } from './loading-type';

@Injectable({
  providedIn:'root'
})
export class LoadingService{

  loadingSubject = new Subject<LoadingType>();

  getLoading(){
    return this.loadingSubject
                .asObservable()
                .pipe(startWith(LoadingType.STOPPED));

  }

  start(){
    setTimeout(()=>
      this.loadingSubject.next(LoadingType.LOADING),
      100
    );
  }

  stop(){
    setTimeout(()=>
      this.loadingSubject.next(LoadingType.STOPPED),
      100
    );
  }

}
