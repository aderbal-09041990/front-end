import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TokenService } from '../../service/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(private tokenService:TokenService){}

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>> {

    const token = this.tokenService.get();

    if (token) {

      const cloned = req.clone({
        headers: req.headers.set("Authorization","Bearer " +token)
      });

      return next.handle(cloned);

    }
    else {

      return next.handle(req).pipe(map(event => {

        if(event instanceof HttpResponse){

          if(event.status != 200){
            this.tokenService.clear();
          }

        }

        return event;

      }));
    }

  }

}
