import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptor } from './interceptor/token/token.interceptor';
import { LoadingModule } from './core/loading/loading-module';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from './core/alert/alert.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    LoginComponent,
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    LoadingModule,
    CommonModule,
    AlertModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
