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
        loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule),
        canActivate:[RouteGuard]
      },
      {
        path:'estado',
        loadChildren: () => import('./pages/estado/estado.module').then(m => m.EstadoModule),
        canActivate:[RouteGuard]
      },
      {
        path:'cidade',
        loadChildren: () => import('./pages/cidade/cidade.module').then(m => m.CidadeModule),
        canActivate:[RouteGuard]
      },
      {
        path:'fornecedor',
        loadChildren: () => import('./pages/fornecedor/fornecedor.module').then(m => m.FornecedorModule),
        canActivate:[RouteGuard]
      },
      {
        path:'produto',
        loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoModule),
        canActivate:[RouteGuard]
      }
      ,
      {
        path:'tipo/embalagem',
        loadChildren: () => import('./pages/tipo_embalagem/tipo_embalagem.module').then(m => m.TipoEmbalagemModule),
        canActivate:[RouteGuard]
      },
      {
        path:'prioridade',
        loadChildren: () => import('./pages/prioridade/prioridade.module').then(m => m.PrioridadeModule),
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
