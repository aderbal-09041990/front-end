import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Cidade } from 'src/app/model/cidade';
import { Estado } from 'src/app/model/estado';


@Component({
  templateUrl: './modal_cidade.component.html'
})
export class ModalCidadeComponent implements OnInit {

  @Input() cidade: Cidade;
  estados:Estado[];
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  cidadeForm: FormGroup;

  constructor(
    private requestService: RequestService,
    public activeModal: NgbActiveModal,
    private formBiulder: FormBuilder,
    private alertService:AlertService){
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getId();
    this. loadEstados();
  }

  initializeForm() {
    this.cidadeForm = this.formBiulder.group({
      id: ['', []],
      nome: ['', [Validators.required]],
      codigoIBGE: ['', [Validators.required]],
      idEstado: ['', [Validators.required]]
    });
  }

  setFormValue(cidade: Cidade) {
    this.cidadeForm.get('id').setValue(cidade.id);
    this.cidadeForm.get('nome').setValue(cidade.nome);
    this.cidadeForm.get('codigoIBGE').setValue(cidade.codigoIBGE);
    this.cidadeForm.get('idEstado').setValue(cidade.estado.id);
  }

  getCidadeForm() {
    return new Cidade(this.getFormValues());
  }

  getFormValues() {
    return this.cidadeForm.value;
  }

  salvar() {

    this.requestService.post("/cidade/save", this.getCidadeForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do cidade foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  deletar(){
    this.requestService.post("/cidade/delete", this.getCidadeForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O cidade foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.cidade.id != null) {
      this.requestService.getParams("/cidade/find/by", this.cidade.id.toString())
        .subscribe(response => {
          this.setFormValue(response as Cidade);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }

  loadEstados() {

    this.requestService.get("/estado/find/all")
      .subscribe(response => {
        this.estados = response as Estado[];
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

}
