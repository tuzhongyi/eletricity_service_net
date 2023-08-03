import { PaginatorComponent } from '../paginator/paginator.component';
import { DefaultTableComponent } from './default-table/default-table.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { EmployeesTrackRecordTableComponent } from './employees-track-record-table/employees-track-record-table.component';
import { RealtimeDeviceListTableComponent } from './realtime-device-table/realtime-device-table.component';
import { RealtimeRecordTableComponent } from './realtime-record-table/realtime-record-table.component';
import { RecordEventTableComponent } from './record-event-table/record-event-table.component';
import { VideoSourceTableComponent } from './video-source-table/video-source-table.component';

export const TableComponents = [
  RealtimeDeviceListTableComponent,
  RealtimeRecordTableComponent,
  RecordEventTableComponent,
  VideoSourceTableComponent,
  DefaultTableComponent,
  PaginatorComponent,
  EmployeesTableComponent,
  EmployeesTrackRecordTableComponent,
];
