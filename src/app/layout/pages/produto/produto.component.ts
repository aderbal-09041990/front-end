import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { ModalProdutoComponent } from './modal/modal_produto.component';
import { RequestService } from 'src/app/service/request/request.service';
import { Produto } from 'src/app/model/produto';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-produto',
  templateUrl:"./produto.component.html",
})
export class ProdutoComponent implements OnInit {

  modalOptions:NgbModalOptions;
  produtos:Produto[];
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
    this.loadProdutos();
  }

  loadProdutos(){
    this.requestService.get("/produto/find/all")
    .subscribe(response => {
      this.produtos = response as Produto[];
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  alterar(produto:Produto){
    this.open('Alterar produto',produto,false);
  }

  cadastrar(){
    this.open('Cadastrar produto',new Produto(null,null,null,null,null,null,null,null,null,null,null,null,null),false);
  }

  deletar(produto:Produto){
    this.open('Excluir produto',produto,true);
  }

  open(title:string,produto:Produto,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalProdutoComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.produto = produto;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadProdutos();
      }).catch((res) => {});
  }

}
