import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalTipoEmbalagemComponent } from './modal/modal_tipo_embalagem.component';
import { TipoEmbalagemRoutingModule } from './tipo_embalagem.routing.module';
import { TipoEmbalagemComponent } from './tipo_embalagem.component';

@NgModule({
  declarations:[
    ModalTipoEmbalagemComponent,
    TipoEmbalagemComponent
  ],
  exports:[
    ModalTipoEmbalagemComponent,
    TipoEmbalagemComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    TipoEmbalagemRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalTipoEmbalagemComponent
  ]
})
export class TipoEmbalagemModule{}
