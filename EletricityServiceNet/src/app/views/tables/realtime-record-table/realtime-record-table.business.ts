import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { GetEventRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { RealtimeRecordTableConverter } from './realtime-record-table.converter';
import { RealtimeRecordModel } from './realtime-record-table.model';

@Injectable()
export class RealtimeRecordTableBusiness
  implements IBusiness<EventRecord[], RealtimeRecordModel[]>
{
  constructor(private service: EventRecordRequestService) {}
  Converter: IConverter<EventRecord[], RealtimeRecordModel[]> =
    new RealtimeRecordTableConverter();

  async load(
    duration: DurationParams,
    type?: EventType
  ): Promise<RealtimeRecordModel[]> {
    let data = await this.getData(duration, type).catch((x) => {
      let array = new Array();
      for (let i = 0; i < 20; i++) {
        let record = new EventRecord();
        record.Id = i.toString();
        record.ResourceName = '记录' + i;
        record.EventTime = new Date();
        record.FloorName = i + 'F';
        record.EventType = EventType.Business;
        array.push(record);
      }
      return array;
    });

    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    duration: DurationParams,
    type?: EventType
  ): Promise<EventRecord[]> {
    let params = new GetEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    if (type) {
      params.EventTypes = [type];
    }
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
