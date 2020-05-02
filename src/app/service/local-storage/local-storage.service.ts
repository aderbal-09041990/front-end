import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { TokenService } from '../token/token.service';
import { Token } from '../token/token';

const helperToken = new JwtHelperService();

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  constructor(private tokenService: TokenService) { }

  private decode(): any {
    return helperToken.decodeToken(this.tokenService.get());
  }

  usuario(): string {
    const token = (this.decode() as Token);
    return token.sub;
  }

  setNomeUsuario(nome: string) {
    localStorage.setItem("nome", nome);
  }

  getNomeUsuario(): string {
    return localStorage.getItem("nome");
  }

  setIdUsuario(id: string) {
    localStorage.setItem("id", id);
  }
  getIdUsuario(): string {
    return localStorage.getItem("id");
  }

  setIdLayuot(id: string) {
    localStorage.setItem("idLayuot", id);
  }

  getIdLayuot() {
    return localStorage.getItem("idLayuot");
  }

}
