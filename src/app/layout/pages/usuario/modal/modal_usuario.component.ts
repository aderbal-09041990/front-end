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
      nome: [' ', [Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(200)]],
      email: ['', [Validators.required,
                  Validators.email,
                  Validators.minLength(10),
                  Validators.maxLength(100)]],
      cpf: ['', [Validators.required]],
      ativo:['',[]],
      sexo:['',[]]
    });
  }

  setFormValue(usuario: Usuario) {
    this.usuarioForm.get('id').setValue(usuario.id);
    this.usuarioForm.get('nome').setValue(usuario.nome);
    this.usuarioForm.get('email').setValue(usuario.email);
    this.usuarioForm.get('cpf').setValue(usuario.cpf);
    this.usuarioForm.get('ativo').setValue(usuario.ativo);
    this.usuarioForm.get('sexo').setValue(usuario.sexo);
  }

  getUsuarioForm() {
    return JSON.stringify(
      Usuario.newUsuario(this.usuarioForm.value));
  }

  get form() { return this.usuarioForm.controls; }


  salvar() {

    this.requestService.post("/usuario/save", this.getUsuarioForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('As informações do usuário foram salvas com sucesso.');
      },
        responseError => {
          console.log(responseError)
          this.alertService.errors(responseError.error.errors);
        }
      );

  }

  deletar(){
    this.requestService.post("/usuario/delete", this.getUsuarioForm())
      .subscribe(response => {
        this.activeModal.close();
        this.alertService.success('O usuário foi excluído com sucesso.');
      },
        responseError => {
          this.alertService.errors(responseError.error.errors);
        }
      );
  }

  getId() {

    if (this.usuario.id != null) {
      this.requestService.getParams("/usuario/find/by", this.usuario.id.toString())
        .subscribe(response => {
          this.setFormValue(response as Usuario);
        },
        responseError => {
          this.alertService.errors(responseError.error.errors);
        });
    }
  }
}
