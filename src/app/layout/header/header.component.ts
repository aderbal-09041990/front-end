import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from 'src/app/service/token/token.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AfterViewInit{

  @Input() usuario:Usuario;

  constructor(private tokenService:TokenService,
              private router: Router) { }

  ngAfterViewInit() {}

  logout(){
    this.tokenService.clear();
    this.router.navigate(['/login'])
  }

}
