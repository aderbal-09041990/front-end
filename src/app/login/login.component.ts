import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from 'src/app/service/request/request.service';
import { TokenService } from '../service/token/token.service';
import { AlertService } from '../core/alert/alert.service';
import { LoginResponse } from '../model/login-response';
import { Login } from 'src/app/model/login';
import { LocalStorageService } from '../service/local-storage/local-storage.service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() loginResponse:LoginResponse;
  loginForm: FormGroup;
  login:Login;
  options?: any;

  constructor(private formBiulder: FormBuilder,
              private requestService:RequestService,
              private localStorageService:LocalStorageService,
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

    this.requestService.post("/auth/login",this.getLogin())
    .subscribe(
      response => {

        this.loginResponse = response as LoginResponse;
        this.tokenService.set(this.loginResponse.token);
        this.localStorageService.setIdUsuario(this.loginResponse.usuario.id.toString());

        this.router.navigate(['/app']);
    },
    responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  getLogin(){
    const values = this.loginForm.value;
    return new Login({email:values.email,senha:values.senha});
  }

}
