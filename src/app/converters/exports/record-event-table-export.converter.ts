import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { HowellExportModel } from 'src/app/tools/exports/hw-export.model';
import { Language } from 'src/app/tools/language';
import { RecordEventTableItemModel } from 'src/app/views/tables/record-event-table/record-event-table.model';

export class RecordEventTableExportConverter
  implements IExportConverter<RecordEventTableItemModel[]>
{
  Convert(
    source: RecordEventTableItemModel<any>[],
    ...res: any[]
  ): HowellExportModel {
    let model = new HowellExportModel();
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      let value = new Array();
      value.push(i + 1);
      value.push(item.datetime);
      value.push(item.name);
      value.push(item.floor);
      value.push(item.zone);
      value.push(item.type);
      model.datas.push(value);
    }
    return model;
  }
}
