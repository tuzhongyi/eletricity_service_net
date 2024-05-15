import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { StrangerRecord } from 'src/app/models/stranger-record.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { StrangerRecordModel } from './people-stranger-record-list-item.model';

@Injectable()
export class PeopleStrangerRecordListItemConverter {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}
  convert(source: StrangerRecord) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(StrangerRecordModel, plain);

    return model;
  }
}
