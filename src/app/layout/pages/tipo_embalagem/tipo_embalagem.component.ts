import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { ModalTipoEmbalagemComponent } from './modal/modal_tipo_embalagem.component';
import { RequestService } from 'src/app/service/request/request.service';
import { TipoEmbalagem } from 'src/app/model/tipo_embalagem';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-tipo-embalagem',
  templateUrl:"./tipo_embalagem.component.html",
})
export class TipoEmbalagemComponent implements OnInit {

  modalOptions:NgbModalOptions;
  tipoEmbalagens:TipoEmbalagem[];
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
    this.loadTipoEmbalagens();
  }

  loadTipoEmbalagens(){
    this.requestService.get("/tipo/embalagem/find/all")
    .subscribe(response => {
      this.tipoEmbalagens = response as TipoEmbalagem[];
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  alterar(tipoEmbalagem:TipoEmbalagem){
    this.open('Alterar tipo embalagem',tipoEmbalagem,false);
  }

  cadastrar(){
    this.open('Cadastrar tipo embalagem',new TipoEmbalagem(null,null),false);
  }

  deletar(tipoEmbalagem:TipoEmbalagem){
    this.open('Excluir tipo embalagem',tipoEmbalagem,true);
  }

  open(title:string,tipoEmbalagem:TipoEmbalagem,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalTipoEmbalagemComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.tipoEmbalagem = tipoEmbalagem;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadTipoEmbalagens();
      }).catch((res) => {});
  }

}
