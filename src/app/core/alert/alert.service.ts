import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LoadingService } from '../loading/loading.service';
import { Alert, AlertType } from './alert';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AlertService {

  constructor(private loadingService:LoadingService,
    private router:Router){}

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  success(message: string) {
    this.alert(new Alert({type: AlertType.Success, message,autoClose: true}));
  }

  errorResponse(response: any) {
    console.log(response)
    if(response.status === 403){
      this.router.navigate(['/page/not/autorized']);
    }else{
      this.errors(response.error.errors)
    }
  }

  error(message: string) {
    this.loadingService.stop();
    this.alert(new Alert({type: AlertType.Error,message,autoClose: true}));
  }

  errors(errors:any[]){
    console.log(errors)
    errors.forEach(error => {
      console.log(error.message)
      this.alert(new Alert({type: AlertType.Error,message:error.message,autoClose: true}));
    });
  }

  info(message: string) {
    this.alert(new Alert({type: AlertType.Info, message,autoClose: true}));
  }

  warn(message: string) {
    this.alert(new Alert({type: AlertType.Warning, message,autoClose: true}));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }
}
