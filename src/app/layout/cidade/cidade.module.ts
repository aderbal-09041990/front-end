import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalCidadeComponent } from './modal/modal_cidade.component';
import { CidadeRoutingModule } from './cidade.routing.module';
import { CidadeComponent } from './cidade.component';


@NgModule({
  declarations:[
    ModalCidadeComponent,
    CidadeComponent
  ],
  exports:[
    ModalCidadeComponent,
    CidadeComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    CidadeRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalCidadeComponent
  ]
})
export class CidadeModule{}
