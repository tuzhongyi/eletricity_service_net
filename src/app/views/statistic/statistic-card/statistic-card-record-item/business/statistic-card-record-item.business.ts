import { Injectable } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { StatisticCardRecordItemService } from './service/statistic-card-record-item.service';
import { StatisticCardRecordItemConverter } from './statistic-card-record-item.converter';

@Injectable()
export class StatisticCardRecordItemBusiness {
  constructor(
    private service: StatisticCardRecordItemService,
    private _config: ConfigRequestService
  ) {
    this.converter = new StatisticCardRecordItemConverter(_config);
  }

  private converter: StatisticCardRecordItemConverter;

  async load(type: EventType) {
    let statistic = await this.service.statistic.load();
    let record = await this.service.record.load(type);
    let model = await this.converter.convert(type, statistic, record.length);
    return model;
  }

  async config() {
    return this._config.statistic.get();
  }
}
