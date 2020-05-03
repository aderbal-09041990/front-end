import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalFornecedorComponent } from './modal/modal_fornecedor.component';
import { FornecedorRoutingModule } from './fornecedor.routing.module';
import { FornecedorComponent } from './fornecedor.component';

@NgModule({
  declarations:[
    ModalFornecedorComponent,
    FornecedorComponent
  ],
  exports:[
    ModalFornecedorComponent,
    FornecedorComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    FornecedorRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalFornecedorComponent
  ]
})
export class FornecedorModule{}
