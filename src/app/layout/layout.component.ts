import { Component,ViewEncapsulation,AfterViewInit, OnInit} from '@angular/core';
import { Helpers } from '../helpers';

import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { RequestService } from '../service/request/request.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: '.page-wrapper',
  templateUrl:'./layout.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements AfterViewInit,OnInit {

  usuario:Usuario = new Usuario(null,null,null,null,null);

  constructor(private requestService:RequestService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  ngAfterViewInit() { Helpers.initLayout(); }

  private getUsuario(){
    this.requestService.post("/usuario/by/email",this.localStorageService.usuario())
    .subscribe(
      response => {
        this.usuario = response as Usuario;
        this.localStorageService.setNomeUsuario(this.usuario.nome);
        this.localStorageService.setIdUsuario(this.usuario.id.toString());
        if(this.usuario.layout != null){
          this.localStorageService.setIdLayuot(this.usuario.layout.id.toString());
          Helpers.montaTema(this.usuario.layout);
        }
    });
  }

}
