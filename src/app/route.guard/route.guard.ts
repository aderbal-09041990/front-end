import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../service/token/token.service';

@Injectable({
  providedIn:"root"
})
export class RouteGuard implements CanActivate{

  constructor(private tokenService:TokenService,
              private router:Router){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):
     boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       if(this.tokenService.logado()){
         return true;
       }else{
         this.router.navigate(['/login'])
        return false;
       }
  }

}
