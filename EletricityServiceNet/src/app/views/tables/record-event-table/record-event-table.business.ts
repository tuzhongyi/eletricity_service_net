import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { Page, PagedList } from 'src/app/models/page.model';
import { GetEventRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';
import { RecordEventTableConverter } from './record-event-table.converter';
import {
  RecordEventTableItemModel,
  RecordEventTableOptions,
} from './record-event-table.model';

@Injectable()
export class RecordEventTableBusiness
  implements
    IBusiness<PagedList<EventRecord>, PagedList<RecordEventTableItemModel>>
{
  constructor(private service: EventRecordRequestService) {}
  Converter: IConverter<
    PagedList<EventRecord>,
    PagedList<RecordEventTableItemModel>
  > = new RecordEventTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    opts: RecordEventTableOptions
  ): Promise<PagedList<RecordEventTableItemModel>> {
    let data = await this.getData(opts).catch((x) => {
      let paged = new PagedList<EventRecord>();
      paged.Page = new Page();
      paged.Page.PageCount = 1;
      paged.Page.PageIndex = opts.pageIndex;
      paged.Page.PageSize = opts.pageSize;
      paged.Page.RecordCount = 10;
      paged.Page.TotalRecordCount = 10;
      paged.Data = [];
      for (let i = 0; i < paged.Page.TotalRecordCount; i++) {
        let record = new EventRecord();
        record.Id = i.toString();
        record.ResourceName = '测试';
        record.EventTime = new Date();
        paged.Data.push(record);
      }
      return paged;
    });

    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    opts: RecordEventTableOptions
  ): Promise<PagedList<EventRecord>> {
    let params = new GetEventRecordsParams();
    params.BeginTime = opts.begin;
    params.EndTime = opts.end;
    params.PageIndex = opts.pageIndex;
    params.PageSize = opts.pageSize;
    if (opts.floor) {
      params.FloorIds = [opts.floor];
    }
    if (opts.type) {
      params.EventTypes = [opts.type];
    }
    if (opts.name) {
      params.ResouceName = opts.name;
    }
    return this.service.list(params);
  }
}
