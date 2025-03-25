import { NgModule } from '@angular/core';
import { ViewComponentsModule } from './view-components.module';
import { ViewRoutingModule } from './view-routing.module';

@NgModule({
  declarations: [],
  imports: [ViewRoutingModule, ViewComponentsModule],
})
export class ViewModule {}
