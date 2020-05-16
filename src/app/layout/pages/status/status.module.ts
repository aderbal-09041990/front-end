import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask'

import { ModalStatusComponent } from './modal/modal_status.component';
import { StatusRoutingModule } from './status.routing.module';
import { StatusComponent } from './status.component';

@NgModule({
  declarations:[
    ModalStatusComponent,
    StatusComponent
  ],
  exports:[
    ModalStatusComponent,
    StatusComponent
  ],
  imports:[
    NgxMaskModule.forRoot(),
    StatusRoutingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  entryComponents:[
    ModalStatusComponent
  ]
})
export class StatusModule{}
