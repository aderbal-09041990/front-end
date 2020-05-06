import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { TipoEmbalagem } from 'src/app/model/tipo_embalagem';

@Component({
  templateUrl: './modal_tipo_embalagem.component.html'
})
export class ModalTipoEmbalagemComponent implements OnInit {

  @Input() tipoEmbalagem: TipoEmbalagem;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  tipoEmbalagemForm: FormGroup;

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
    this.tipoEmbalagemForm = this.formBiulder.group({
      id: ['', []],
      descricao: ['', [Validators.required]]
    });
  }

  setFormValue(tipoEmbalagem: TipoEmbalagem) {
    this.tipoEmbalagemForm.get('id').setValue(tipoEmbalagem.id);
    this.tipoEmbalagemForm.get('descricao').setValue(tipoEmbalagem.descricao);
  }

  getTipoEmbalagemForm() {
    const values = this.getFormValues();
    return JSON.stringify(
      new TipoEmbalagem(
        values.id,
        values.descricao
      )
    );
  }

  getFormValues() {
    return this.tipoEmbalagemForm.value;
  }

  salvar() {

    this.requestService.post("/tipo/embalagem/save", this.getTipoEmbalagemForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do tipo_embalagem foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/tipo/embalagem/delete", this.getTipoEmbalagemForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O tipo_embalagem foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.tipoEmbalagem.id != null) {
      this.requestService.getParams("/tipo/embalagem/find/by", this.tipoEmbalagem.id.toString())
        .subscribe(response => {
          this.tipoEmbalagem = response as TipoEmbalagem;
          this.setFormValue(this.tipoEmbalagem);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
