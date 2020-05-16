import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Prioridade } from 'src/app/model/prioridade';


@Component({
  templateUrl: './modal_prioridade.component.html'
})
export class ModalPrioridadeComponent implements OnInit {

  @Input() prioridade: Prioridade;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  prioridadeForm: FormGroup;

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
    this.prioridadeForm = this.formBiulder.group({
      id: ['', []],
      descricao: ['', [Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(50)]],
      ativo: [true, []]
    });
  }

  setFormValue(prioridade: Prioridade) {
    this.prioridadeForm.get('id').setValue(prioridade.id);
    this.prioridadeForm.get('descricao').setValue(prioridade.descricao);
    this.prioridadeForm.get('ativo').setValue(prioridade.ativo);
  }

  getprioridadeForm() {
    return JSON.stringify(
      Prioridade.newPrioridade(
        this.getFormValues()
       )
    );
  }

  get form() { return this.prioridadeForm.controls; }

  getFormValues() {
    return this.prioridadeForm.value;
  }

  salvar() {

    this.requestService.post("/prioridade/save", this.getprioridadeForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do prioridade foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/prioridade/delete", this.getprioridadeForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O prioridade foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.prioridade.id != null) {
      this.requestService.getParams("/prioridade/find/by", this.prioridade.id.toString())
        .subscribe(response => {
          this.prioridade = response as Prioridade;
          this.setFormValue(this.prioridade);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
