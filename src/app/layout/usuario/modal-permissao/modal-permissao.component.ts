import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Permissao } from 'src/app/model/permissao';
import { PermissaoDTO } from 'src/app/model/permissaoDTO';

@Component({
  templateUrl:'./modal-permissao.component.html',
})
export class ModalPermissaoComponent implements OnInit{

  usuario:Usuario;
  itens:PermissaoDTO[];

  constructor(private requestService:RequestService,
    public activeModal: NgbActiveModal,
    private alertService:AlertService){}

  ngOnInit(): void {
    this.find();
  }

  find(){
    this.requestService.getParams("/permissao/find/all/permissaoDTO",this.usuario.id.toString())
      .subscribe(response => {
        this.itens = response as PermissaoDTO[];
      },
        error => {
          console.log(error);
          this.alertService.success(error.message);
        }
      );
  }

  updatePermissao(id:number){
    this.requestService.put("/usuario/update/permissao",
    id.toString(),
    this.usuario.id.toString())
    .subscribe(response => {
    },
      error => {
        console.log(error);
        this.alertService.success(error.message);
      }
    );
  }


}
