import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { EventRecord } from 'src/app/models/event-record.model';
import { GetEventRecordsParams } from 'src/app/network/request/events/event-request.params';
import { EventRecordRequestService } from 'src/app/network/request/events/event-request.service';
import { RecordEventTableConverter } from './record-event-table.converter';
import {
  RecordEventTableItemModel,
  RecordEventTableOptions,
} from './record-event-table.model';

@Injectable()
export class RecordEventTableBusiness
  implements IBusiness<EventRecord[], RecordEventTableItemModel[]>
{
  constructor(private service: EventRecordRequestService) {}
  Converter: IConverter<
    EventRecord[],
    RecordEventTableItemModel<EventRecord>[]
  > = new RecordEventTableConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    opts: RecordEventTableOptions
  ): Promise<RecordEventTableItemModel<EventRecord>[]> {
    let data = await this.getData(opts).catch((x) => {
      let array = new Array();
      for (let i = 0; i < 10; i++) {
        let record = new EventRecord();
        record.Id = i.toString();
        record.ResourceName = '测试';
        record.EventTime = new Date();
        array.push(record);
      }
      return array;
    });

    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(opts: RecordEventTableOptions): Promise<EventRecord[]> {
    let params = new GetEventRecordsParams();
    params.BeginTime = opts.begin;
    params.EndTime = opts.end;
    if (opts.floor) {
      params.FloorIds = [opts.floor];
    }
    if (opts.type) {
      params.EventTypes = [opts.type];
    }
    let paged = await this.service.list(params);
    return paged.Data;
  }
}
