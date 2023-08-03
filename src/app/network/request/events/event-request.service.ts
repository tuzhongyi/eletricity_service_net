import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeTrackRecord } from 'src/app/models/employee-track-record.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { EventUrl } from '../../url/businesshall_service/events.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import {
  GetEventRecordsParams,
  GetTrackRecordsParams,
} from './event-request.params';

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

  private _track?: EventTrackRecordRequestService;
  public get track(): EventTrackRecordRequestService {
    if (!this._track) {
      this._track = new EventTrackRecordRequestService(this.basic);
    }
    return this._track;
  }
}

class EventTrackRecordRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(EmployeeTrackRecord);
  }
  private type: BaseTypeRequestService<EmployeeTrackRecord>;
  list(params: GetTrackRecordsParams = new GetTrackRecordsParams()) {
    let url = EventUrl.track().list();
    return this.type.paged(url, params);
  }
}
