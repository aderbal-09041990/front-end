import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalEstadoComponent } from './modal/modal_estado.component';
import { EstadoRoutingModule } from './estado.routing.module';
import { EstadoComponent } from './estado.component';


@NgModule({
  declarations:[
    ModalEstadoComponent,
    EstadoComponent
  ],
  exports:[
    ModalEstadoComponent,
    EstadoComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    EstadoRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalEstadoComponent
  ]
})
export class EstadoModule{}
