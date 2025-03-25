import { Injectable } from '@angular/core';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { StatisticCardPassengerFlowType } from '../statistic-card-passenger-flow.model';
import { StatisticCardPassengerFlowConverter } from './statistic-card-passenger-flow.converter';
import { StatisticCardPassengerFlowService } from './statistic-card-passenger-flow.service';

@Injectable()
export class StatisticCardPassengerFlowBusiness {
  constructor(
    service: BusinessHallRequestService,
    config: ConfigRequestService
  ) {
    this.service = new StatisticCardPassengerFlowService(service);
    this.converter = new StatisticCardPassengerFlowConverter(config);
  }

  private service: StatisticCardPassengerFlowService;
  private converter: StatisticCardPassengerFlowConverter;
  async load(type: StatisticCardPassengerFlowType) {
    let duration = DateTimeTool.allDay(new Date());
    let datas = await this.service.load(duration);
    let model = this.converter.convert(datas, type);
    return model;
  }
}
