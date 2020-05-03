import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { ModalCidadeComponent } from './modal/modal_cidade.component';
import { Cidade } from 'src/app/model/cidade';

@Component({
  selector: 'app-cidade',
  templateUrl:"./cidade.component.html",
})
export class CidadeComponent implements OnInit {

  modalOptions:NgbModalOptions;
  cidades:Cidade[];
  search:string;

  constructor(private requestService: RequestService,

    private modalService: NgbModal){

      this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }

  ngOnInit(): void {
    this.loadCidades();
  }

  loadCidades(){
    this.requestService.get("/cidade/find/all")
    .subscribe(response => {
      this.cidades = response as Cidade[];
    },
      error =>{console.log(error)}
    );
  }

  alterar(cidade:Cidade){
    this.open('Alterar cidade',cidade,false);
  }

  cadastrar(){
    this.open('Cadastrar cidade',new Cidade(null,null,null,null),false);
  }

  deletar(cidade:Cidade){
    this.open('Excluir estado',cidade,true);
  }

  open(title:string,cidade:Cidade,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalCidadeComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.cidade = cidade;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadCidades();
      }).catch((res) => {});
  }

}
