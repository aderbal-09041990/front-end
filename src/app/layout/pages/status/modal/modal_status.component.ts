import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Status } from 'src/app/model/status';


@Component({
  templateUrl: './modal_status.component.html'
})
export class ModalStatusComponent implements OnInit {

  @Input() status: Status;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  statusForm: FormGroup;

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
    this.statusForm = this.formBiulder.group({
      id: ['', []],
      descricao: ['', [Validators.required,
                      Validators.minLength(5),
                      Validators.maxLength(50)]],
      ativo: [true, []]
    });
  }

  setFormValue(status: Status) {
    this.statusForm.get('id').setValue(status.id);
    this.statusForm.get('descricao').setValue(status.descricao);
    this.statusForm.get('ativo').setValue(status.ativo);
  }

  getStatusForm() {
    return Status.newStatus(
        this.getFormValues()
      );
  }

  get form() { return this.statusForm.controls; }

  getFormValues() {
    return this.statusForm.value;
  }

  salvar() {

    this.requestService.post("/status/save", this.getStatusForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do status foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/status/delete", this.getStatusForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O status foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.status.id != null) {
      this.requestService.getParams("/status/find/by", this.status.id.toString())
        .subscribe(response => {
          this.status = response as Status;
          this.setFormValue(this.status);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
