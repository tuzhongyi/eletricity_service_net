import { PaginatorComponent } from '../paginator/paginator.component';
import { DefaultTableComponent } from './default-table/default-table.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesTrackRecordTableComponent } from './employees-track-record-table/employees-track-record-table.component';
import { RealtimeDeviceListTableComponent } from './realtime-device-table/realtime-device-table.component';
import { RealtimeRecordTableComponent } from './realtime-record-table/realtime-record-table.component';
import { RecordEventTableComponent } from './record-event-table/record-event-table.component';
import { SettingsSubtitleChannelSupportedTableComponent } from './settings-subtitle-channel-supported-table/settings-subtitle-channel-supported-table.component';
import { SettingsSubtitleChannelTableComponent } from './settings-subtitle-channel-table/settings-subtitle-channel-table.component';
import { VideoKeywordTableComponent } from './video-keyword-table/video-keyword-table.component';
import { VideoSourceSelectTableComponent } from './video-source-select-table/video-source-select-table.component';
import { VideoSourceTableComponent } from './video-source-table/video-source-table.component';
import { VideoSubtitleTableComponent } from './video-subtitle-table/video-subtitle-table.component';

export const TableComponents = [
  RealtimeDeviceListTableComponent,
  RealtimeRecordTableComponent,
  RecordEventTableComponent,
  VideoSourceTableComponent,
  VideoSourceSelectTableComponent,
  VideoSubtitleTableComponent,
  VideoKeywordTableComponent,
  SettingsSubtitleChannelTableComponent,
  SettingsSubtitleChannelSupportedTableComponent,
  DefaultTableComponent,
  PaginatorComponent,
  EmployeesTableComponent,
  EmployeesTrackRecordTableComponent,
];
