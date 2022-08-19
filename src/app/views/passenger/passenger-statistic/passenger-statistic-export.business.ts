import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ITimeDataGroup } from 'src/app/components/charts/chart.model';
import { RecordEventTableExportConverter } from 'src/app/converters/exports/record-event-table-export.converter';
import { TimeDataGroupExportConverter } from 'src/app/converters/exports/time-data-group-export.converter';
import { ExportType } from 'src/app/enums/export-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { Duration } from 'src/app/models/duration.model';
import { ExportTool } from 'src/app/tools/export.tool';
import { ExportBasicBusiness } from 'src/app/tools/service/export.business.a';
import { StoreService } from 'src/app/tools/service/store.service';

@Injectable()
export class PassengerStatisticExportBusiness extends ExportBasicBusiness<
  ITimeDataGroup<number>[]
> {
  constructor(exports: ExportTool, private store: StoreService) {
    super(exports);
  }

  exportConverter: IExportConverter<ITimeDataGroup<number>[]> =
    new TimeDataGroupExportConverter();

  async Export(
    type: ExportType,
    datas: ITimeDataGroup<number>[],
    name: string,
    date: Date,
    unit: TimeUnit
  ) {
    let hall = await this.store.getBusinessHall();
    let title = `${hall.Name} ${formatDate(
      date,
      'yyyy年MM月dd日',
      'en'
    )} ${name}`;
    let headers = ['序号', '日期'];
    switch (unit) {
      case TimeUnit.Hour:
      case TimeUnit.Week:
        headers.push('时间');
        break;

      default:
        break;
    }

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      headers.push(data.Name);
    }
    this.exports.export(
      type,
      title,
      headers,
      datas,
      this.exportConverter,
      unit
    );
  }
}
