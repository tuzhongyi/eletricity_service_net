import { Injectable } from '@angular/core';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { PeopleStrangerRecordListItemConverter } from './people-stranger-record-list-item.converter';

@Injectable()
export class PeopleStrangerRecordListItemBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private converter: PeopleStrangerRecordListItemConverter
  ) {}

  convert(source: StrangerRecord) {
    return this.converter.convert(source);
  }
}
