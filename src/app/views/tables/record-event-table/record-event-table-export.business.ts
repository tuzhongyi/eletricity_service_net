import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { RecordEventTableExportConverter } from 'src/app/converters/exports/record-event-table-export.converter';
import { ExportType } from 'src/app/enums/export-type.enum';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';
import { ExportTool } from 'src/app/tools/export.tool';
import { ExportBasicBusiness } from 'src/app/tools/service/export.business.a';
import { StoreService } from 'src/app/tools/service/store.service';
import { RecordEventTableItemModel } from './record-event-table.model';

@Injectable()
export class RecordEventTableExportBusiness extends ExportBasicBusiness<
  RecordEventTableItemModel[]
> {
  constructor(exports: ExportTool, private store: StoreService) {
    super(exports);
  }

  exportConverter: IExportConverter<RecordEventTableItemModel<any>[]> =
    new RecordEventTableExportConverter();

  async Export(
    type: ExportType,
    datas: RecordEventTableItemModel<any>[],
    duration: Duration
  ) {
    if (!datas) {
      return;
    }
    let hall = await this.store.getBusinessHall();
    let title = `${hall.Name} ${formatDate(
      duration.begin,
      'yyyy年MM月dd日 HH时',
      'en'
    )} 至 ${formatDate(duration.end, 'yyyy年MM月dd日 HH时', 'en')} 报警记录`;
    let headers = ['序号', '日期', '名称', '楼层', '区域', '报警类型'];

    this.exports.export(type, title, headers, datas, this.exportConverter);
  }
}
