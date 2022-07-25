import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/components/charts/chart.model';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { ItemModel } from 'src/app/models/item.model';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';

export class PassengerStatisticConverter
  implements IConverter<PassengerFlow[], ITimeDataGroup<number>[]>
{
  Convert(
    source: PassengerFlow[],
    items: ItemModel[]
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

    for (let i = 0; i < source.length; i++) {
      const item = source[i];

      let in_data: ITimeData<number> = {
        value: item.InNum,
        time: item.BeginTime,
        index: i + 1,
      };
      array[0].datas.push(in_data);
      let out_data: ITimeData<number> = {
        value: item.OutNum,
        time: item.BeginTime,
        index: i + 1,
      };
      array[1].datas.push(out_data);
    }
    return array;
  }
}
