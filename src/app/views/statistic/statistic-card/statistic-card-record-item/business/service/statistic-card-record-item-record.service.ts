import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { GetEventRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';

@Injectable()
export class StatisticCardRecordItemRecordService {
  constructor(private service: EventRecordRequestService) {}
  async load(type: EventType) {
    let now = new Date();
    let begin = new Date(now.getTime());
    begin.setHours(now.getHours(), 0, 0, 0);
    let end = new Date(now.getTime());
    end.setHours(now.getHours(), 59, 59, 999);

    let params = new GetEventRecordsParams();
    params.BeginTime = begin;
    params.EndTime = end;
    params.EventTypes = [type];
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
