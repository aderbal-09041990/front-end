import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalPrioridadeComponent } from './modal/modal_prioridade.component';
import { PrioridadeRoutingModule } from './prioridade.routing.module';
import { PrioridadeComponent } from './prioridade.component';

@NgModule({
  declarations:[
    ModalPrioridadeComponent,
    PrioridadeComponent
  ],
  exports:[
    ModalPrioridadeComponent,
    PrioridadeComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    PrioridadeRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalPrioridadeComponent
  ]
})
export class PrioridadeModule{}
