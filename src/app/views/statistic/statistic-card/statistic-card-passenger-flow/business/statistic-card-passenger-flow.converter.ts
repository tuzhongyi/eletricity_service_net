import { PassengerFlow } from 'src/app/models/passenger-flow.model';

import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import {
  StatisticCardPassengerFlowModel,
  StatisticCardPassengerFlowType,
} from '../statistic-card-passenger-flow.model';

export class StatisticCardPassengerFlowConverter {
  constructor(private config: ConfigRequestService) {}

  convert(source: PassengerFlow[], type: StatisticCardPassengerFlowType) {
    switch (type) {
      case StatisticCardPassengerFlowType.in:
        return this.in(source);
      case StatisticCardPassengerFlowType.out:
        return this.out(source);
      default:
        throw new Error('Invalid type');
    }
  }

  private async in(source: PassengerFlow[]) {
    let config = await this.config.statistic.get();
    let model: StatisticCardPassengerFlowModel = {
      title: '今日流入客流',
      count: 0,
      color: { r: 67, g: 200, b: 82 },
      xAxis: [],
      datas: [],
    };

    let begin = config.begin;
    let end = new Date().getHours();

    for (let i = begin; i <= end; i++) {
      let item = source.find((x) => x.BeginTime.getHours() === i);
      if (item) {
        model.datas.push(item.InNum);
        model.count += item.InNum;
      } else if (i === end) {
      } else {
        model.datas.push(0);
      }
    }
    for (let i = config.begin; i <= config.end; i++) {
      let time = i.toString().padStart(2, '0');
      model.xAxis.push(`${time}:00`);
    }

    return model;
  }
  private async out(source: PassengerFlow[]) {
    let config = await this.config.statistic.get();
    let model: StatisticCardPassengerFlowModel = {
      title: '今日流出客流',
      count: 0,
      color: { r: 0, g: 255, b: 255 },
      xAxis: [],
      datas: [],
    };

    let begin = config.begin;
    let end = new Date().getHours();
    for (let i = begin; i <= end; i++) {
      let item = source.find((x) => x.BeginTime.getHours() === i);
      if (item) {
        model.datas.push(item.OutNum);
        model.count += item.OutNum;
      } else if (i === end) {
      } else {
        model.datas.push(0);
      }
    }
    for (let i = config.begin; i <= config.end; i++) {
      let time = i.toString().padStart(2, '0');
      model.xAxis.push(`${time}:00`);
    }
    return model;
  }
}
