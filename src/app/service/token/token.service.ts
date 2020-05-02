import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

const token = 'token';
const helperToken = new JwtHelperService();

@Injectable({
  providedIn:"root"
})
export class TokenService{

  get():string{
    return localStorage.getItem(token);
  }

  set(tokenValue:string){
    localStorage.setItem(token,tokenValue.replace("Bearer ",""))
  }

  clear(){
    localStorage.removeItem(token);
  }

  logado():boolean{
    return !helperToken.isTokenExpired(this.get());
  }

}
