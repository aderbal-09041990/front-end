import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estado } from 'src/app/model/estado';
import { RequestService } from 'src/app/service/request/request.service';
import { ModalEstadoComponent } from './modal/modal_estado.component';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-estado',
  templateUrl:"./estado.component.html",
})
export class EstadoComponent implements OnInit {

  modalOptions:NgbModalOptions;
  estados:Estado[];
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
    this.loadEstados();
  }

  loadEstados(){
    this.requestService.get("/estado/find/all")
    .subscribe(response => {
      this.estados = response as Estado[];
    },responseError => {
      this.alertService.errorResponse(responseError);
    });
  }

  alterar(estado:Estado){
    this.open('Alterar estado',estado,false);
  }

  cadastrar(){
    this.open('Cadastrar estado',new Estado(null,null,null,null),false);
  }

  deletar(estado:Estado){
    this.open('Excluir estado',estado,true);
  }

  open(title:string,estado:Estado,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalEstadoComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.estado = estado;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadEstados();
      }).catch((res) => {});
  }

}
