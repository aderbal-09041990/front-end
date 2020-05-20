import { Component, Input } from '@angular/core';
import * as $ from "jquery";

import { Usuario } from 'src/app/model/usuario';

declare var jQuery:any;
declare var $:any;

@Component({
  selector:'[app-sidebar]',
  templateUrl:'./sidebar.component.html'
})
export class SidebarComponent{

  @Input() usuario:Usuario;

  ngOnInit() {}


  animationArrow(item:string){

    //movimenta a seta
    if($(".icon" + item).hasClass("fa-angle-left")){
      $(".icon" + item).addClass('fa-angle-down');
      $(".icon" + item).removeClass('fa-angle-left');
    }else{
      $(".icon" + item).addClass('fa-angle-left');
      $(".icon" + item).removeClass('fa-angle-down');
    }
  }


  /*hasPermission(permisao:String){

    for(var p of this.usuario.permissoes){
        if(p.nome === permisao){
          return true;
        }
    }
    return false;
  }

  hasPermissionMenu(permisao:string){

    var hasPermission = false;

    switch(permisao){
      case 'ROLE_ESTAQUE':
        hasPermission = this.hasPermission('ROLE_PRODUTO_CONSULTAR');
        hasPermission = this.hasPermission('ROLE_TIPO_EMBALAGEM_CONSULTAR');
        break;
      case 'ROLE_ENTIDADES':
        hasPermission = this.hasPermission('ROLE_USUARIO_CONSULTAR');
        hasPermission = this.hasPermission('ROLE_FORNECEDOR_CONSULTAR');
        break;
      case 'ROLE_CONFIGURACAO':
        hasPermission = this.hasPermission('ROLE_ESTADO_CONSULTAR');
        hasPermission = this.hasPermission('ROLE_CIDADE_CONSULTAR');
        break;
    }

    return hasPermission;

  }*/

}
