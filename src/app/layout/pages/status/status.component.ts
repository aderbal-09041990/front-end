import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalStatusComponent } from './modal/modal_status.component';
import { RequestService } from 'src/app/service/request/request.service';
import { Status } from 'src/app/model/status';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-status',
  templateUrl:"./status.component.html",
})
export class StatusComponent implements OnInit {

  modalOptions:NgbModalOptions;
  listaStatus:Status[];
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
    this.loadstatuss();
  }

  loadstatuss(){
    this.requestService.get("/status/find/all")
    .subscribe(response => {
      this.listaStatus = response as Status[];
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  alterar(status:Status){
    this.open('Alterar status',status,false);
  }

  cadastrar(){
    this.open('Cadastrar status',new Status(),false);
  }

  deletar(status:Status){
    this.open('Excluir status',status,true);
  }

  open(title:string,status:Status,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalStatusComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.status = status;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadstatuss();
      }).catch((res) => {});
  }

  alterarAtivo(status:Status){

    const msn = status.ativo ?
                  'A status foi desativada com sucesso!' :
                  'A status foi ativada com sucesso!' ;

    this.requestService.post("/status/update/ativo",status)
    .subscribe(response => {
      this.alertService.success(msn);
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

}
