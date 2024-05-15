import { Injectable } from '@angular/core';
import { GetStrangerRecordsParams } from 'src/app/network/request/business-hall/business-hall-request.params';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { StoreService } from 'src/app/tools/service/store.service';
import { PeopleStrangerRecordListOptions } from './people-stranger-record-list.model';

@Injectable()
export class PeopleStrangerRecordListBusiness {
  constructor(
    private service: BusinessHallRequestService,
    private store: StoreService
  ) {}

  async load(
    index: number,
    size: number,
    opts: PeopleStrangerRecordListOptions
  ) {
    let hall = await this.store.getBusinessHall();
    let datas = await this.loadData(hall.Id, index, size, opts);
    return datas;
  }

  loadData(
    hallId: string,
    index: number,
    size: number,
    opts: PeopleStrangerRecordListOptions
  ) {
    let params = new GetStrangerRecordsParams();
    params.PageIndex = index;
    params.PageSize = size;
    let duration = DateTimeTool.allYear(opts.date);
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.StrangerId = opts.strangerId ?? '';
    params.Similarity = opts.similarity;
    if (opts.cameras && opts.cameras.length > 0) {
      params.CameraIds = opts.cameras;
    }

    return this.service.stranger.record.list(hallId, params);
  }
}
