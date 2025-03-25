import { EventType } from 'src/app/enums/event-type.enum';
import { StatisticConfig } from 'src/app/models/config/config-statistic';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { Language } from 'src/app/tools/language';
import { PromiseValue } from 'src/app/tools/view-models/value.promise';
import { StatisticChartPieRecordData } from '../../../statistic-chart/statistic-chart-pie-record/statistic-chart-pie-record.model';
import { StatisticCardRecordTotalModel } from '../statistic-card-record-total.model';

export class StatisticCardRecordTotalConverter {
  constructor(private _config: ConfigRequestService) {
    this.init();
  }
  private config = new PromiseValue<StatisticConfig>();
  private colors = new Map<EventType, { r: number; g: number; b: number }>();

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

  async convert(source: CurrentBusinessHallStatistic) {
    let config = await this.config.get();
    let model = new StatisticCardRecordTotalModel();
    model.datas = config.eventtypes.map((type) => {
      let data = new StatisticChartPieRecordData();
      data.type = type;
      data.name = Language.EventType(type);
      data.value = 0;
      data.color = this.colors.get(type) ?? { r: 0, g: 0, b: 0 };
      if (source.EventNumbers) {
        let event = source.EventNumbers.find((x) => x.EventType === type);
        if (event) {
          data.value = event.Number;
          model.count += event.Number;
        }
      }
      return data;
    });
    return model;
  }
}
