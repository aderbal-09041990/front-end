import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalFornecedorComponent } from './modal/modal_fornecedor.component';
import { RequestService } from 'src/app/service/request/request.service';
import { Fornecedor } from 'src/app/model/fornecedor';

@Component({
  selector: 'app-fornecedor',
  templateUrl:"./fornecedor.component.html",
})
export class FornecedorComponent implements OnInit {

  modalOptions:NgbModalOptions;
  fornecedores:Fornecedor[];
  search:string;

  constructor(private requestService: RequestService,

    private modalService: NgbModal){

      this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }

  ngOnInit(): void {
    this.loadfornecedors();
  }

  loadfornecedors(){
    this.requestService.get("/fornecedor/find/all")
    .subscribe(response => {
      this.fornecedores = response as Fornecedor[];
    },
      error =>{console.log(error)}
    );
  }

  alterar(fornecedor:Fornecedor){
    this.open('Alterar fornecedor',fornecedor,false);
  }

  cadastrar(){
    this.open('Cadastrar fornecedor',new Fornecedor(null,null,null,null,null,null),false);
  }

  deletar(fornecedor:Fornecedor){
    this.open('Excluir fornecedor',fornecedor,true);
  }

  open(title:string,fornecedor:Fornecedor,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalFornecedorComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.fornecedor = fornecedor;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadfornecedors();
      }).catch((res) => {});
  }

}
