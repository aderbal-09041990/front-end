import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Estado } from 'src/app/model/estado';


@Component({
  templateUrl: './modal_estado.component.html'
})
export class ModalEstadoComponent implements OnInit {

  @Input() estado: Estado;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  estadoForm: FormGroup;

  constructor(
    private requestService: RequestService,
    public activeModal: NgbActiveModal,
    private formBiulder: FormBuilder,
    private alertService:AlertService){
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getId();
  }

  initializeForm() {
    this.estadoForm = this.formBiulder.group({
      id: ['', []],
      nome: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      sigla: ['', [Validators.required]]
    });
  }

  setFormValue(estado: Estado) {
    this.estadoForm.get('id').setValue(estado.id);
    this.estadoForm.get('nome').setValue(estado.nome);
    this.estadoForm.get('codigo').setValue(estado.codigo);
    this.estadoForm.get('sigla').setValue(estado.sigla);
  }

  getEstadoForm() {
    return new Estado(this.getFormValues())
  }

  getFormValues() {
    return this.estadoForm.value;
  }

  salvar() {

    this.requestService.post("/estado/save", this.getEstadoForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do estado foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/estado/delete", this.getEstadoForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O estado foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.estado.id != null) {
      this.requestService.getParams("/estado/find/by", this.estado.id.toString())
        .subscribe(response => {
          this.setFormValue(response as Estado);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
