import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { settings } from 'cluster';

import { IndexComponent } from './views/index/index.component';
import { ViewComponentsModule } from './views/views.module';

enum RoutePath {
  index = 'index',
  setting = 'settings',
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
  },
];

@NgModule({
  declarations: [], //, HeaderComponent
  imports: [RouterModule.forRoot(routes), ViewComponentsModule],
  exports: [RouterModule, ViewComponentsModule],
})
export class AppRoutingModule {}
