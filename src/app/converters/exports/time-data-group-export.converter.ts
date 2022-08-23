import { formatDate } from '@angular/common';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/tools/exports/hw-export.model';
import { Language } from 'src/app/tools/language';

export class TimeDataGroupExportConverter
  implements IExportConverter<ITimeDataGroup<number>[]>
{
  Convert(source: ITimeDataGroup<number>[], unit: TimeUnit): HowellExportModel {
    let model = new HowellExportModel();

    let rowCount = 0;
    if (source.length > 0 && source[0].datas.length > 0) {
      rowCount = source[0].datas.length;
    } else {
      return model;
    }

    for (let i = 0; i < rowCount; i++) {
      let value = new Array();
      value.push(i + 1);
      value.push(formatDate(source[0].datas[i].time, 'yyyy年MM月dd日', 'en'));
      if (unit === TimeUnit.Week) {
        value.push(Language.Week(source[0].datas[i].time.getDay()));
      } else if (unit === TimeUnit.Hour) {
        value.push(formatDate(source[0].datas[i].time, 'HH:mm', 'en'));
      } else {
      }

      for (let j = 0; j < source.length; j++) {
        const data = source[j].datas[i];
        value.push(data.value);
      }
      model.datas.push(value);
    }

    model.headIndex = 2;
    model.dataIndex = [3, 4];

    return model;
  }
}
