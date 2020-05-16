import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PrioridadeComponent } from './prioridade.component';

const routes: Routes = [
  {
    path: '',
    component:PrioridadeComponent
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class PrioridadeRoutingModule{}
