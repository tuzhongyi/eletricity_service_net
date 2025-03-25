import { EventType } from 'src/app/enums/event-type.enum';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { StatisticConfig } from 'src/app/models/config/config-statistic';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { PromiseValue } from 'src/app/tools/view-models/value.promise';
import { IStatisticChartLineColor } from '../../../statistic-chart/statistic-chart-line/statistic-chart-line.model';
import { StatisticCardRecordItemModel } from '../statistic-card-record-item.model';

export class StatisticCardRecordItemConverter {
  constructor(private _config: ConfigRequestService) {
    this.init();
  }

  private config = new PromiseValue<StatisticConfig>();
  private colors = new Map<EventType, IStatisticChartLineColor>();

  private async init() {
    let config = await this._config.statistic.get();

    let colors = [
      { r: 210, g: 236, b: 81 },
      { r: 54, g: 122, b: 224 },
      { r: 67, g: 200, b: 82 },
      { r: 216, g: 80, b: 80 },
      { r: 66, g: 218, b: 220 },
      { r: 145, g: 91, b: 255 },
      { r: 216, g: 117, b: 70 },
      { r: 46, g: 139, b: 255 },
    ];
    config.eventtypes.forEach((x, i) => {
      this.colors.set(x, colors[i]);
    });
    this.config.set(config);
  }

  async convert(
    type: EventType,
    source: BusinessHallStatistic[],
    current: number
  ) {
    let config = await this.config.get();
    let model: StatisticCardRecordItemModel = {
      count: 0,
      color: this.colors.get(type)!,
      xAxis: [],
      datas: [],
    };

    let begin = config.begin;
    let end = new Date().getHours();

    for (let i = begin; i <= end; i++) {
      let _source = source.find((x) => x.BeginTime.getHours() === i);

      if (_source) {
        let data = this.get.data(type, _source);
        model.count += data;
        model.datas.push(data);
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

  get = {
    data: (type: EventType, source: BusinessHallStatistic) => {
      if (source.EventNumbers) {
        let event = source.EventNumbers.find((x) => x.EventType === type);
        return event?.Number ?? 0;
      }

      return 0;
    },
  };
}
