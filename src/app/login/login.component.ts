import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from 'src/app/service/request/request.service';
import { TokenService } from '../service/token/token.service';
import { AlertService } from '../core/alert/alert.service';
import { Login } from 'src/app/model/login';
import { timeout } from 'rxjs/operators';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  login:Login;
  options?: any;

  constructor(private formBiulder: FormBuilder,
              private requestService:RequestService,
              private tokenService: TokenService,
              private alertService:AlertService,
              private router:Router) { }

  ngOnInit() {
    this.tokenService.clear();
    $('body').addClass('empty-layout bg-silver-300');
    this.initializeForm();
  }

  ngOnDestroy() { $('body').removeClass('empty-layout bg-silver-300'); }

  initializeForm(){

    this.loginForm = this.formBiulder.group({
      email:['', Validators.required],
      senha:['', Validators.required]
    });

  }

  logar(){

    this.tokenService.clear();

    this.requestService.post("/login",this.getJson())
    .subscribe(
      response => {
        this.router.navigate(['/app']);
    },
      error =>{
        console.log(error)
        this.alertService.error("Usuário ou Senha são inválido!");
      }
    );
  }

  getJson(){
    const values = this.loginForm.value;
    return JSON.stringify(new Login(values.email,values.senha));
  }

}
