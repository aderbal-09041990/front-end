import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalUsuarioComponent } from './modal/modal_usuario.component';
import { UsuarioRoutingModule } from './usuario.routing.module';
import { UsuarioComponent } from './usuario.component';
import { ModalPermissaoComponent } from './modal-permissao/modal-permissao.component';

@NgModule({
  declarations:[
    ModalPermissaoComponent,
    ModalUsuarioComponent,
    UsuarioComponent
  ],
  exports:[
    ModalPermissaoComponent,
    ModalUsuarioComponent,
    UsuarioComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    UsuarioRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalPermissaoComponent,
    ModalUsuarioComponent
  ]
})
export class UsuarioModule{}
