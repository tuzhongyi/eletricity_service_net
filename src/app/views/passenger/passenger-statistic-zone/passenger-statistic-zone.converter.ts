import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/components/charts/chart.model';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { ItemModel } from 'src/app/models/item.model';
import { ZoneNumber } from 'src/app/models/zone-number.model';

export class PassengerStatisticZoneConverter
  implements IConverter<BusinessHallStatistic[], ITimeDataGroup<number>[]>
{
  Convert(
    source: BusinessHallStatistic[],
    unit: TimeUnit,
    begin: Date
  ): ITimeDataGroup<number>[] {
    let array: ITimeDataGroup<number>[] = [];
    if (!source || source.length <= 0) return array;

    let items = this.getItems(source[0]);

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
    if (source.length > 0) {
      let first = 0;

      let start = 0;

      switch (unit) {
        case TimeUnit.Hour:
          start = begin.getHours();
          first = source[0].BeginTime.getHours();
          break;
        case TimeUnit.Month:
          start = begin.getDate();
          first = source[0].BeginTime.getDate();
          break;
        case TimeUnit.Week:
          start = begin.getDay();
          first = source[0].BeginTime.getDay();
          break;
        default:
          break;
      }
      for (let i = start; i < first; i++, index++) {
        let current = new Date(source[0].BeginTime.getTime());
        switch (unit) {
          case TimeUnit.Hour:
            current.setHours(i);
            break;
          case TimeUnit.Month:

          case TimeUnit.Week:
            current.setDate(i);
            break;
          default:
            break;
        }

        array.forEach((x, j) => {
          let data: ITimeData<number> = {
            value: 0,
            time: current,
            index: index,
          };
          array[j].datas.push(data);
        });
      }
    }
    for (let j = 0; j < items.length; j++) {
      const item = items[j];
      for (let i = 0; i < source.length; i++) {
        const sourceItem = source[i];
        let zone = sourceItem.ZoneNumbers![j];
        let data: ITimeData<number> = {
          value: zone.Number ?? 0,
          time: sourceItem.BeginTime,
          index: index + i + 1,
        };
        array[j].datas.push(data);
      }
    }
    return array;
  }

  getItems(statistic: BusinessHallStatistic): ItemModel<ZoneNumber>[] {
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
