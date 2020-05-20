import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { ModalEmpresaComponent } from './modal/modal-empresa.component';
import { Empresa } from 'src/app/model/empresa';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-empresa',
  templateUrl:"./empresa.component.html",
})
export class EmpresaComponent implements OnInit {

  modalOptions:NgbModalOptions;
  empresas:Empresa[];
  search:string;

  constructor(private requestService: RequestService,
    private alertService:AlertService,
    private modalService: NgbModal){

      this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(){
    this.requestService.get("/empresa/find/all")
    .subscribe(response => {
      this.empresas = response as Empresa[];
    },responseError => {
      this.alertService.errorResponse(responseError);
    });
  }

  alterar(empresa:Empresa){
    this.open('Alterar empresa',empresa,false);
  }

  cadastrar(){
    this.open('Cadastrar empresa',new Empresa(),false);
  }

  deletar(empresa:Empresa){
    this.open('Excluir estado',empresa,true);
  }

  open(title:string,empresa:Empresa,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalEmpresaComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.empresa = empresa;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadEmpresas();
      }).catch((res) => {});
  }

  alterarAtivo(empresa:Empresa){

    const msn = empresa.ativo ?
                  'A empresa foi desativada com sucesso!' :
                  'A empresa foi ativada com sucesso!' ;

    this.requestService.post("/empresa/update/ativo",status)
    .subscribe(response => {
      this.alertService.success(msn);
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

}
