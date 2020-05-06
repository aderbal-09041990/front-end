import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Fornecedor, TipoDocumento } from 'src/app/model/fornecedor';


@Component({
  templateUrl: './modal_fornecedor.component.html'
})
export class ModalFornecedorComponent implements OnInit {

  @Input() fornecedor: Fornecedor;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  fornecedorForm: FormGroup;

  constructor(
    private requestService: RequestService,
    public activeModal: NgbActiveModal,
    private formBiulder: FormBuilder,
    private alertService:AlertService){
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getId();
    if(this.fornecedor.id == null){
      this.fornecedorForm.get('tipoDocumento').setValue('CPF');
    }
  }

  id:number;
  tipoDocumento:string;
  cgc:string;
  ie:String;
  nome:string;
  fantasia:string;

  initializeForm() {
    this.fornecedorForm = this.formBiulder.group({
      id: ['', []],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      ie: ['', []],
      nome: ['', [Validators.required]],
      fantasia: ['', []]
    });
  }

  setFormValue(fornecedor: Fornecedor) {
    this.fornecedorForm.get('id').setValue(fornecedor.id);
    this.fornecedorForm.get('tipoDocumento').setValue(fornecedor.tipoDocumento);
    this.fornecedorForm.get('numeroDocumento').setValue(fornecedor.numeroDocumento);
    this.fornecedorForm.get('ie').setValue(fornecedor.ie);
    this.fornecedorForm.get('nome').setValue(fornecedor.nome);
    this.fornecedorForm.get('fantasia').setValue(fornecedor.fantasia);
  }

  getfornecedorForm() {
    const values = this.getFormValues();
    return JSON.stringify(
      new Fornecedor(
        values.id,
        values.tipoDocumento,
        values.numeroDocumento,
        values.ie,
        values.nome,
        values.fantasia
      )
    );
  }

  getFormValues() {
    return this.fornecedorForm.value;
  }

  salvar() {

    this.requestService.post("/fornecedor/save", this.getfornecedorForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do fornecedor foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/fornecedor/delete", this.getfornecedorForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O fornecedor foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.fornecedor.id != null) {
      this.requestService.getParams("/fornecedor/find/by", this.fornecedor.id.toString())
        .subscribe(response => {
          this.fornecedor = response as Fornecedor;
          this.setFormValue(this.fornecedor);
        },responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
