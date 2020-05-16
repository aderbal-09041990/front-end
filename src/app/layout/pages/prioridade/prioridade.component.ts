import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalPrioridadeComponent } from './modal/modal_prioridade.component';
import { RequestService } from 'src/app/service/request/request.service';
import { Prioridade } from 'src/app/model/prioridade';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-prioridade',
  templateUrl:"./prioridade.component.html",
})
export class PrioridadeComponent implements OnInit {

  modalOptions:NgbModalOptions;
  prioridades:Prioridade[];
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
    this.loadprioridades();
  }

  loadprioridades(){
    this.requestService.get("/prioridade/find/all")
    .subscribe(response => {
      this.prioridades = response as Prioridade[];
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  alterar(prioridade:Prioridade){
    this.open('Alterar prioridade',prioridade,false);
  }

  cadastrar(){
    this.open('Cadastrar prioridade',new Prioridade(),false);
  }

  deletar(prioridade:Prioridade){
    this.open('Excluir prioridade',prioridade,true);
  }

  open(title:string,prioridade:Prioridade,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalPrioridadeComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.prioridade = prioridade;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadprioridades();
      }).catch((res) => {});
  }

  alterarAtivo(prioridade:Prioridade){

    const msn = prioridade.ativo ?
                  'A prioridade foi desativada com sucesso!' :
                  'A prioridade foi ativada com sucesso!' ;

    this.requestService.post("/prioridade/update/ativo",prioridade)
    .subscribe(response => {
      this.alertService.success(msn);
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

}
