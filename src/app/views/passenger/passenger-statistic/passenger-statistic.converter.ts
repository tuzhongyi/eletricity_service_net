import { formatDate } from '@angular/common';
import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/components/charts/chart.model';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import {
  IConverter,
  IExportConverter,
} from 'src/app/interfaces/converter.interface';
import { ItemModel } from 'src/app/models/item.model';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';
import { HowellExportModel } from 'src/app/tools/exports/hw-export.model';
import { Language } from 'src/app/tools/language';

export class PassengerStatisticConverter
  implements IConverter<PassengerFlow[], ITimeDataGroup<number>[]>
{
  Convert(
    source: PassengerFlow[],
    items: ItemModel[],
    unit: TimeUnit,
    begin: Date
  ): ITimeDataGroup<number>[] {
    let array: ITimeDataGroup<number>[] = [];

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
        let in_data: ITimeData<number> = {
          value: 0,
          time: current,
          index: index,
        };
        array[0].datas.push(in_data);
        let out_data: ITimeData<number> = {
          value: 0,
          time: current,
          index: index,
        };
        array[1].datas.push(out_data);
      }

      source[0].BeginTime;
    }

    for (let i = 0; i < source.length; i++) {
      const item = source[i];

      let in_data: ITimeData<number> = {
        value: item.InNum,
        time: item.BeginTime,
        index: index + i + 1,
      };
      array[0].datas.push(in_data);
      let out_data: ITimeData<number> = {
        value: item.OutNum,
        time: item.BeginTime,
        index: index + i + 1,
      };
      array[1].datas.push(out_data);
    }
    return array;
  }
}
