import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './app-routing.path';

import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.index,
    loadChildren: () => import('./views/view.module').then((m) => m.ViewModule),
    // canActivate: [AuthorizationActivate],
  },
];

@NgModule({
  declarations: [], //, HeaderComponent
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
