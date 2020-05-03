import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { RouteGuard } from '../route.guard/route.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path:'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate:[RouteGuard]
      },
      {
        path:'estado',
        loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule),
        canActivate:[RouteGuard]
      },
      {
        path:'cidade',
        loadChildren: () => import('./cidade/cidade.module').then(m => m.CidadeModule),
        canActivate:[RouteGuard]
      },
      {
        path:'fornecedor',
        loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule),
        canActivate:[RouteGuard]
      }
    ]
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class LayoutRoutingModule{}
