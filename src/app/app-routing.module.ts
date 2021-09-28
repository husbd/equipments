import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./modules/list/list.module').then(m => m.ListModule) },
  { path: 'detail', loadChildren: () => import('./modules/detail/detail.module').then(m => m.DetailModule) },
  { path: 'create', loadChildren: () => import('./modules/create/create.module').then(m => m.CreateModule) },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
