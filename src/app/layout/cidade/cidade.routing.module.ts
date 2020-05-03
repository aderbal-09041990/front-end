import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CidadeComponent } from './cidade.component';


const routes: Routes = [
  {
    path: '',
    component:CidadeComponent
  }
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class CidadeRoutingModule{}
