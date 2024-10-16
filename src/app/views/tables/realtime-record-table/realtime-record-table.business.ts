import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GetEventRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';
import { RealtimeRecordTableConverter } from './realtime-record-table.converter';
import { RealtimeRecordModel } from './realtime-record-table.model';

@Injectable()
export class RealtimeRecordTableBusiness
  implements IBusiness<EventRecord[], RealtimeRecordModel[]>
{
  constructor(private service: EventRecordRequestService) {}
  Converter = new RealtimeRecordTableConverter();

  async load(
    duration: DurationParams,
    type?: EventType[]
  ): Promise<RealtimeRecordModel[]> {
    let data = await this.getData(duration, type);
    // .catch((x) => {
    //   return this.test();
    // });

    // if (data.length === 0) {
    //   data = this.test();
    // }

    let model = this.Converter.Convert(data);
    return model;
  }

  test() {
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
  }

  async getData(
    duration: DurationParams,
    type?: EventType[]
  ): Promise<EventRecord[]> {
    let params = new GetEventRecordsParams();
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    if (type) {
      params.EventTypes = type;
    }
    let paged = await this.service.list(params);
    return paged.Data;
  }

  convert(data: EventRecord) {
    let model = this.Converter.item.Convert(data);
    return model;
  }
}
