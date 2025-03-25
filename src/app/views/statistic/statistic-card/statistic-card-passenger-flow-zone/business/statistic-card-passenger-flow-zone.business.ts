import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { StoreService } from 'src/app/tools/service/store.service';
import { StatisticCardPassengerFlowZoneConverter } from './statistic-card-passenger-flow-zone.converter';
import { StatisticCardPassengerFlowZoneService } from './statistic-card-passenger-flow-zone.service';

@Injectable()
export class StatisticCardPassengerFlowZoneBusiness {
  constructor(
    service: BusinessHallRequestService,
    private _config: ConfigRequestService,
    private store: StoreService
  ) {
    this.service = new StatisticCardPassengerFlowZoneService(service);
  }

  private service: StatisticCardPassengerFlowZoneService;
  private converter = new StatisticCardPassengerFlowZoneConverter();

  async load() {
    let hall = await this.store.getBusinessHall();
    let config = await this._config.statistic.get();
    let datas = await this.service.load(hall.Id, config.begin);
    let model = this.converter.convert(datas);
    return model;
  }

  config() {
    return this._config.statistic.get();
  }
}
