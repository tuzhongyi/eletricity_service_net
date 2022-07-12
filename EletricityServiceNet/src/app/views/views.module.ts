import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Directives } from '../directives';
import { MaterialModule } from '../material.module';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { HeaderComponents } from './header/header.module';
import { IndexComponent } from './index/index.component';
import { PassengerComponents } from './passenger/passenger.module';
import { RealtimeComponents } from './realtime/realtime.module';
import { RecordComponents } from './record/record.module';
import { TableComponents } from './tables/tables.module';
import { VideoComponents } from './video/video.module';

const components = [
  IndexComponent,
  CardComponent,
  ...HeaderComponents,
  ...RealtimeComponents,
  ...PassengerComponents,
  ...RecordComponents,
  ...VideoComponents,
  ...TableComponents,
  ...Directives,
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: components,
})
export class ViewComponentsModule {}
