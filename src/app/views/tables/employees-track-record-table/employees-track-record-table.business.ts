import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { EmployeeTrackRecord } from 'src/app/models/employee-track-record.model';
import { GetTrackRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';
import { EmployeesTrackRecordTableArgs } from './employees-track-record-table.model';

@Injectable()
export class EmployeesTrackRecordTableBusiness
  implements IBusiness<EmployeeTrackRecord[]>
{
  constructor(private service: EventRecordRequestService) {}

  async load(
    args: EmployeesTrackRecordTableArgs
  ): Promise<EmployeeTrackRecord[]> {
    let data = await this.getData(args).catch((x) => {
      let array = new Array();
      for (let i = 0; i < 20; i++) {
        let record = new EmployeeTrackRecord();
        record.Id = i.toString();
        record.ResourceName = '记录' + i;
        record.EventTime = new Date();
        record.FloorName = i + 'F';
        record.EventType = EventType.Business;
        array.push(record);
      }
      return array;
    });

    return data;
  }

  async getData(
    args: EmployeesTrackRecordTableArgs
  ): Promise<EmployeeTrackRecord[]> {
    let params = new GetTrackRecordsParams();
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    params.EmployeeName = args.name;
    let paged = await this.service.track.list(params);
    return paged.Data;
  }
}
