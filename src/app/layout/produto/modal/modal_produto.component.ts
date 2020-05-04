import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Produto } from 'src/app/model/produto';


@Component({
  templateUrl: './modal_produto.component.html'
})
export class ModalProdutoComponent implements OnInit {

  @Input() produto: Produto;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  produtoForm: FormGroup;

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
    this.produtoForm = this.formBiulder.group({
      id: ['', []],
      codigo: ['', []],
      nome: ['', [Validators.required]],
      codigoFabrica: ['', [Validators.required]],
      volumes: ['', []],
      shelfLife: ['', []],
      percentualShelfLife: ['', []],
      controleTemperatura: ['', []],
      temperaturaMinima: ['', []],
      temperaturaMaxima: ['', []],
      existeCodigoBarra: ['', []],
      controleLote: ['', []],
      controleVencto: ['', []]
    });
  }

  setFormValue(produto: Produto) {
    this.produtoForm.get('id').setValue(produto.id);
    this.produtoForm.get('codigo').setValue(produto.codigo);
    this.produtoForm.get('nome').setValue(produto.nome);
    this.produtoForm.get('codigoFabrica').setValue(produto.codigoFabrica);
    this.produtoForm.get('volumes').setValue(produto.volumes);
    this.produtoForm.get('shelfLife').setValue(produto.shelfLife);
    this.produtoForm.get('percentualShelfLife').setValue(produto.percentualShelfLife);
    this.produtoForm.get('controleTemperatura').setValue(produto.controleTemperatura);
    this.produtoForm.get('temperaturaMinima').setValue(produto.temperaturaMinima);
    this.produtoForm.get('temperaturaMaxima').setValue(produto.temperaturaMaxima);
    this.produtoForm.get('existeCodigoBarra').setValue(produto.existeCodigoBarra);
    this.produtoForm.get('controleLote').setValue(produto.controleLote);
    this.produtoForm.get('controleVencto').setValue(produto.controleVencto);
  }

  getprodutoForm() {
    const values = this.getFormValues();
    return JSON.stringify(
      new Produto(
        values.id,
        values.codigo,
        values.nome,
        values.codigoFabrica,
        values.volumes,
        values.shelfLife,
        values.percentualShelfLife,
        values.controleTemperatura,
        values.temperaturaMinima,
        values.temperaturaMaxima,
        values.existeCodigoBarra,
        values.controleLote,
        values.controleVencto
      )
    );
  }

  getFormValues() {
    return this.produtoForm.value;
  }

  salvar() {

    this.requestService.post("/produto/save", this.getprodutoForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do produto foram salvas com sucesso.');
      },
        error => {
          console.log(error.error.errors);
          this.alertService.error(error.error.errors);
        }
      );

  }

  deletar(){
    this.requestService.post("/produto/delete", this.getprodutoForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O produto foi excluído com sucesso.');
      },
        error => {
          console.log(error.error.errors);
          this.alertService.error(error.error.errors);
        }
      );
  }

  getId() {

    if (this.produto.id != null) {
      this.requestService.getParams("/produto/find/by", this.produto.id.toString())
        .subscribe(response => {
          this.produto = response as Produto;
          this.setFormValue(this.produto);
        },
          error => {
            console.log(error)
            this.alertService.error(error.error.errors);
          }
        );
    }
  }
}
