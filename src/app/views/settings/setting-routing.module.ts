import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CameraPositionSettingComponent } from './camera-position-setting/camera-position-setting.component';
import { SettingsComponent } from './component/settings.component';
import { EmployeesManagerIndexComponent } from './employees-manager/employees-manager-index/employees-manager-index.component';
import { SettingPathNode } from './setting.model';
import { SettingsCameraZoneComponent } from './settings-camera-zone/settings-camera-zone.component';
import { SettingCameraManagerComponent } from './settings-camera/setting-camera-manager/setting-camera-manager.component';
import { SettingsServiceComponent } from './settings-service/settings-service.component';
import { SettingsSubtitleChannelManagerComponent } from './settings-subtitle-channel-manager/settings-subtitle-channel-manager.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,

    children: [
      {
        path: '',
        redirectTo: SettingPathNode.employees_manager,
        pathMatch: 'full',
      },
      {
        path: SettingPathNode.camera_position,
        component: CameraPositionSettingComponent,
      },
      {
        path: SettingPathNode.camera_zone,
        component: SettingsCameraZoneComponent,
      },
      {
        path: SettingPathNode.camera,
        component: SettingCameraManagerComponent,
      },
      {
        path: SettingPathNode.service_sync,
        component: SettingsServiceComponent,
      },
      {
        path: SettingPathNode.employees_manager,
        component: EmployeesManagerIndexComponent,
      },
      {
        path: SettingPathNode.subtitle,
        component: SettingsSubtitleChannelManagerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
