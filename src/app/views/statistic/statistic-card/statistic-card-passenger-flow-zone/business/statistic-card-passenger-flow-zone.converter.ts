import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/components/charts/chart.model';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { ItemModel } from 'src/app/models/item.model';
import { ZoneNumber } from 'src/app/models/zone-number.model';

export class StatisticCardPassengerFlowZoneConverter {
  convert(source: BusinessHallStatistic[]): ITimeDataGroup<number>[] {
    let array: ITimeDataGroup<number>[] = [];
    if (!source || source.length <= 0) return array;

    let items = this.items(source[source.length - 1]);

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let data: ITimeDataGroup<number> = {
        Id: item.Id,
        Name: item.Name,
        datas: [],
      };
      array.push(data);
    }

    let index = 1;
    let first = 0;

    let start = 8;
    first = source[0].BeginTime.getHours();
    for (let i = start; i < first; i++, index++) {
      let current = new Date(source[0].BeginTime.getTime());
      current.setHours(i);

      array.forEach((x, j) => {
        let data: ITimeData<number> = {
          value: 0,
          time: current,
          index: index,
        };
        array[j].datas.push(data);
      });
    }
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      for (let i = 0; i < source.length; i++) {
        const sourceItem = source[i];

        let zone = sourceItem.ZoneNumbers![j];
        if (!zone) continue;
        let data: ITimeData<number> = {
          value: zone.Number ?? 0,
          time: sourceItem.BeginTime,
          index: index + i + 1,
        };
        let _this = array.find((x) => x.Id === item.Id);
        if (_this) {
          _this.datas.push(data);
        }
      }
    }
    return array;
  }

  private items(statistic: BusinessHallStatistic): ItemModel<ZoneNumber>[] {
    let items: ItemModel[] = [];
    if (statistic.ZoneNumbers) {
      for (let i = 0; i < statistic.ZoneNumbers.length; i++) {
        const zone = statistic.ZoneNumbers[i];
        let item = new ItemModel();
        item.Id = zone.ZoneId;
        item.Name = zone.ZoneName;
        item.data = zone;
        items.push(item);
      }
    }
    return items;
  }
}
