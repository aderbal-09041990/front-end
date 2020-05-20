import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalEmpresaComponent } from './modal/modal-empresa.component';
import { EmpresaRoutingModule } from './empresa.routing.module';
import { EmpresaComponent } from './empresa.component';


@NgModule({
  declarations:[
    ModalEmpresaComponent,
    EmpresaComponent
  ],
  exports:[
    ModalEmpresaComponent,
    EmpresaComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    EmpresaRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalEmpresaComponent
  ]
})
export class EmpresaModule{}
