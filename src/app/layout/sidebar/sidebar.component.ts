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
}
