import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { StatisticCardRecordTotalConverter } from './statistic-card-record-total.converter';
import { StatisticCardRecordTotalService } from './statistic-card-record-total.service';

@Injectable()
export class StatisticCardRecordTotalBusiness {
  constructor(
    service: BusinessHallRequestService,
    store: StoreService,
    config: ConfigRequestService
  ) {
    this.service = new StatisticCardRecordTotalService(service, store);
    this.converter = new StatisticCardRecordTotalConverter(config);
  }

  private service: StatisticCardRecordTotalService;
  private converter: StatisticCardRecordTotalConverter;

  async load() {
    let data = await this.service.load();
    let model = this.converter.convert(data);
    return model;
  }
}
