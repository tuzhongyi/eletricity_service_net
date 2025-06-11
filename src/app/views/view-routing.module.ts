import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPath } from './header/header-navigation/navigarion-path.enum';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { PassengerComponent } from './passenger/passenger.component';
import { PeopleComponent } from './people/people.component';
import { RealtimeComponent } from './realtime/realtime.component';
import { RecordComponent } from './record/record.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticComponent } from './statistic/component/statistic.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,

    children: [
      { path: '', redirectTo: NavigationPath.statistic, pathMatch: 'full' },
      {
        path: NavigationPath.statistic,
        component: StatisticComponent,
      },
      {
        path: NavigationPath.realtime,
        component: RealtimeComponent,
      },
      {
        path: NavigationPath.preview,
        component: HomeComponent,
      },
      {
        path: NavigationPath.passenger,
        component: PassengerComponent,
      },
      {
        path: NavigationPath.record,
        component: RecordComponent,
      },
      {
        path: NavigationPath.video,
        component: VideoComponent,
      },
      {
        path: NavigationPath.setting,
        component: SettingsComponent,
      },
      {
        path: NavigationPath.people,
        component: PeopleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
