import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/model/login';
import { environment } from 'src/environments/environment';

const baseUrl = environment.urlBase;

@Injectable({
  providedIn:"root"
})
export class RequestService{

  constructor(private httpClient:HttpClient){}

  getHeaders(){
      return new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  post(endPoint:string,json:string){
    const options = {
      headers: this.getHeaders()
    }
    return this.httpClient.post(baseUrl + endPoint ,json,options);
  }

  get(endPoint:string){
    return this.httpClient.get(baseUrl + endPoint);
  }

  getParams(endPoint:string,params:string){
    return this.httpClient.get(baseUrl + endPoint + "/" + params);
  }

  put(endPoint:string,params:string,json:string){
    const options = {
      headers: this.getHeaders()
    }
    return this.httpClient.put(baseUrl + endPoint  + "/" + params,json,options);
  }

}
