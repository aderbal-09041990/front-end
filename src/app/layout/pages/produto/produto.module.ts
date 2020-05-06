import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalProdutoComponent } from './modal/modal_produto.component';
import { ProdutoRoutingModule } from './produto.routing.module';
import { ProdutoComponent } from './produto.component';

@NgModule({
  declarations:[
    ModalProdutoComponent,
    ProdutoComponent
  ],
  exports:[
    ModalProdutoComponent,
    ProdutoComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    ProdutoRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalProdutoComponent
  ]
})
export class ProdutoModule{}
