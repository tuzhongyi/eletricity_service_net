import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { components } from '../components/components.module';
import { Directives } from '../directives';
import { MaterialModule } from '../material.module';
import { HeaderComponents } from './header/header.module';
import { PassengerComponents } from './passenger/passenger.module';
import { RealtimeComponents } from './realtime/realtime.module';
import { RecordComponents } from './record/record.module';
import { TableComponents } from './tables/tables.module';
import { VideoComponents } from './video/video.module';

import { RouterModule } from '@angular/router';
import { AngularResizeEventModule } from 'angular-resize-event';
import * as echarts from 'echarts';
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';
import { NgxEchartsModule } from 'ngx-echarts';
import Adsame from 'src/assets/echart-theme/adsame.json';
import { Howell_Components } from '../howell-components/howell-components.module';
import { CustomDateItemPipe } from '../pipes/custom-date-item.pipe';
import { EmployeeTrackComponents } from './employee-track/employee-track.module';
import { HomeComponents } from './home/home.module';
import { IndexComponent } from './index/index.component';
import { PeopleStrangerComponents } from './people-stranger/people-stranger.module';
import { PeoplePictureFaceComponent } from './people/people-picture-face/people-picture-face.component';
import { PeopleComponent } from './people/people.component';
import { SettingComponents } from './settings/settings.module';
import { StatisticComponents } from './statistic/statistic.module';
import { TreeComponents } from './trees/trees.module';
import { WindowComponents } from './windows/windows.module';

echarts.registerTheme('adsame', Adsame);

const ViewComponents = [
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
  ...EmployeeTrackComponents,
  ...Howell_Components,
  PeopleComponent,
  PeoplePictureFaceComponent,
  ...PeopleStrangerComponents,
  ...StatisticComponents,

  components,
  CustomDateItemPipe,
  ...HomeComponents,
];

@NgModule({
  declarations: [...ViewComponents],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AngularResizeEventModule,
  ],
  exports: [...ViewComponents],
})
export class ViewComponentsModule {}
