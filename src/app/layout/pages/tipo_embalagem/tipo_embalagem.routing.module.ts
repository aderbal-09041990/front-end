import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { TipoEmbalagemComponent } from './tipo_embalagem.component';

const routes: Routes = [
  {
    path: '',
    component:TipoEmbalagemComponent
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class TipoEmbalagemRoutingModule{}
