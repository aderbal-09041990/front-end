import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { FornecedorComponent } from './fornecedor.component';

const routes: Routes = [
  {
    path: '',
    component:FornecedorComponent
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class FornecedorRoutingModule{}
