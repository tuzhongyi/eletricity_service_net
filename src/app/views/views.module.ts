import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Directives } from '../directives';
import { MaterialModule } from '../material.module';
import { HeaderComponents } from './header/header.module';
import { IndexComponent } from './index/index.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { PassengerComponents } from './passenger/passenger.module';
import { RealtimeComponents } from './realtime/realtime.module';
import { RecordComponents } from './record/record.module';
import { TableComponents } from './tables/tables.module';
import { VideoComponents } from './video/video.module';
import { components } from '../components/components.module';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import Adsame from 'src/assets/echart-theme/adsame.json';
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';
import { AngularResizeEventModule } from 'angular-resize-event';
import { WindowComponents } from './windows/windows.module';
import { SettingComponents } from './settings/settings.module';
import { TreeComponents } from './trees/trees.module';
import { LoginComponent } from './login/login.component';
import { CustomDatePipe } from '../pipes/test.pipe';

echarts.registerTheme('adsame', Adsame);

const ViewComponents = [
  LoginComponent,
  IndexComponent,
  ...HeaderComponents,
  ...RealtimeComponents,
  ...PassengerComponents,
  ...RecordComponents,
  ...VideoComponents,
  ...TableComponents,
  ...Directives,
  ...WindowComponents,
  ...SettingComponents,
  ...TreeComponents,
  components,
  CustomDatePipe,
];

@NgModule({
  declarations: ViewComponents,
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AngularResizeEventModule,
  ],
  exports: [...ViewComponents],
})
export class ViewComponentsModule {}
