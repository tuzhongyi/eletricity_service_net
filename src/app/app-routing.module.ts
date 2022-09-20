import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './app-routing.path';

import { IndexComponent } from './views/index/index.component';
import { LoginComponent } from './views/login/login.component';
import { ViewComponentsModule } from './views/views.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },

  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.index,
    component: IndexComponent,
  },
];

@NgModule({
  declarations: [], //, HeaderComponent
  imports: [RouterModule.forRoot(routes), ViewComponentsModule],
  exports: [RouterModule, ViewComponentsModule],
})
export class AppRoutingModule {}
