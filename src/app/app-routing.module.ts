import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './route.guard/route.guard';
import { PageNotAutorized } from './page-not-autorized/page-not-autorized.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch:'full'

  },
  {
    path: 'app',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate:[RouteGuard]
  },
  {
    path:'page/not/autorized',
    component: PageNotAutorized
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
