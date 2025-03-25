import { Injectable } from '@angular/core';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { StatisticChartDeviceStateData } from '../../../statistic-chart/statistic-chart-device-state/statistic-chart-device-state.model';
import { StatisticCardDeviceStateService } from './statistic-card-device-state.service';

@Injectable()
export class StatisticCardDeviceStateBusiness {
  constructor(service: BusinessHallRequestService) {
    this.service = new StatisticCardDeviceStateService(service);
  }

  private service: StatisticCardDeviceStateService;

  async load() {
    let datas = await this.service.load();
    let model = new StatisticChartDeviceStateData();
    datas.forEach((data) => {
      switch (data.Status) {
        case DeviceStatus.online:
          model.online++;
          break;
        case DeviceStatus.offline:
          model.offline++;
          break;
        default:
          break;
      }
    });
    return model;
  }
}
