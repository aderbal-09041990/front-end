import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Empresa } from 'src/app/model/empresa';
import { Estado } from 'src/app/model/estado';
import { Cidade } from 'src/app/model/cidade';


@Component({
  templateUrl: './modal-empresa.component.html'
})
export class ModalEmpresaComponent implements OnInit {

  @Input() empresa: Empresa;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  empresaForm: FormGroup;
  estados:Estado[];
  cidades:Cidade[];

  constructor(
    private requestService: RequestService,
    public activeModal: NgbActiveModal,
    private formBiulder: FormBuilder,
    private alertService:AlertService){
  }

  ngOnInit(): void {

    this.initializeForm();
    this.getId();
    this.loadEstados();

  }

  initializeForm() {
    this.empresaForm = this.formBiulder.group({
      id: ['', []],
      nome: ['', [Validators.required,
                  Validators.maxLength(250)]],
      cnpj: ['', []],
      descricao: ['',[Validators.maxLength(250)]],
      ativo: [true, []],
      idEndereco: [, []],
      email: ['',[Validators.email,
                 Validators.maxLength(100)]],
      ddd: ['',[Validators.required,
                Validators.maxLength(2)]],
      telefone: ['',[Validators.required,
                  Validators.maxLength(9)]],
      cep: ['',[Validators.required,
                Validators.maxLength(7)]],
      rua: ['',[Validators.maxLength(250)]],
      bairro: ['',[Validators.maxLength(250)]],
      complemento: ['',[Validators.maxLength(250)]],
      logradouro: ['',[Validators.maxLength(250)]],
      idCidade: ['', []],
      idEstado: ['', []]
    });
  }

  setFormValue(empresa: Empresa) {
    this.empresaForm.get('id').setValue(empresa.id);
    this.empresaForm.get('nome').setValue(empresa.nome);
    this.empresaForm.get('cnpj').setValue(empresa.cnpj);
    this.empresaForm.get('descricao').setValue(empresa.descricao);
    this.empresaForm.get('ativo').setValue(empresa.ativo);
    this.empresaForm.get('idEndereco').setValue(empresa.endereco.id);
    this.empresaForm.get('email').setValue(empresa.endereco.email);
    this.empresaForm.get('ddd').setValue(empresa.endereco.ddd);
    this.empresaForm.get('telefone').setValue(empresa.endereco.telefone);
    this.empresaForm.get('cep').setValue(empresa.endereco.cep);
    this.empresaForm.get('rua').setValue(empresa.endereco.rua);
    this.empresaForm.get('bairro').setValue(empresa.endereco.bairro);
    this.empresaForm.get('complemento').setValue(empresa.endereco.complemento);
    this.empresaForm.get('logradouro').setValue(empresa.endereco.logradouro);
    this.empresaForm.get('idCidade').setValue(empresa.endereco.cidade.id);
    this.empresaForm.get('idEstado').setValue(empresa.endereco.cidade.estado.id);
  }

  getEmpresaForm() {
    return Empresa.newEmpresa(
        this.getFormValues()
      );
  }

  get form() { return this.empresaForm.controls; }

  getFormValues() {
    return this.empresaForm.value;
  }

  salvar() {

    this.requestService.post("/empresa/save", this.getEmpresaForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do empresa foram salvas com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });

  }

  deletar(){
    this.requestService.post("/empresa/delete", this.getEmpresaForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O empresa foi excluído com sucesso.');
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

  getId() {

    if (this.empresa.id != null) {
      this.requestService.getParams("/empresa/find/by", this.empresa.id.toString())
        .subscribe(response => {
          this.empresa = response as Empresa;
          this.setFormValue(this.empresa);
          this.getByEstado();
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

  getByEstado() {

    const idEstado = this.getFormValues().idEstado;

    this.requestService.getParams("/cidade/find/by/estado",idEstado)
      .subscribe(response => {
        this.cidades = response as Cidade[];
      },responseError => {
        this.alertService.errors(responseError.error.errors);
      });
  }

}
