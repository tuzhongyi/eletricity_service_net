import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventRecord } from 'src/app/models/event-record.model';
import { EventUrl } from '../../url/businesshall_service/events.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { GetEventRecordsParams } from './event-request.params';

@Injectable({
  providedIn: 'root',
})
export class EventRecordRequestService {
  constructor(http: HttpClient) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(EventRecord);
  }
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<EventRecord>;
  list(params: GetEventRecordsParams = new GetEventRecordsParams()) {
    let url = EventUrl.record().list();
    return this.type.paged(url, params);
  }
}
