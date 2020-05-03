import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

import { RequestService } from 'src/app/service/request/request.service';
import { AlertService } from 'src/app/core/alert/alert.service';


@Component({
  templateUrl: './modal_usuario.component.html'
})
export class ModalUsuarioComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() modal_titulo;
  @Input() isDelete: Boolean = false;
  @Input() modalClass: string;
  usuarioForm: FormGroup;

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
    this.usuarioForm = this.formBiulder.group({
      id: ['', []],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]]
    });
  }

  setFormValue(usuario: Usuario) {
    this.usuarioForm.get('id').setValue(usuario.id);
    this.usuarioForm.get('nome').setValue(usuario.nome);
    this.usuarioForm.get('email').setValue(usuario.email);
    this.usuarioForm.get('cpf').setValue(usuario.cpf);
  }

  getUsuarioForm() {
    const values = this.getFormValues();
    return JSON.stringify(
      new Usuario(
        values.id,
        values.nome,
        values.email,
        values.cpf));
  }

  getFormValues() {
    return this.usuarioForm.value;
  }

  salvar() {

    this.requestService.post("/usuario/save", this.getUsuarioForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do usuário foram salvas com sucesso.');
      },
        error => {
          console.log(error.error.errors);
          this.alertService.error(error.error.errors);
        }
      );

  }

  deletar(){
    this.requestService.post("/usuario/delete", this.getUsuarioForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O usuário foi excluído com sucesso.');
      },
        error => {
          console.log(error.error.errors);
          this.alertService.error(error.error.errors);
        }
      );
  }

  getId() {

    if (this.usuario.id != null) {
      this.requestService.getParams("/usuario/find/by", this.usuario.id.toString())
        .subscribe(response => {
          this.setFormValue(response as Usuario);
        },
          error => {
            console.log(error)
            this.alertService.error(error.error.errors);
          }
        );
    }
  }
}
