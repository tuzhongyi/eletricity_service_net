import { Injectable } from '@angular/core';
import { ExportType } from '../enums/export-type.enum';
import { IConverter } from '../interfaces/converter.interface';
import { HowellCSV } from './exports/hw-export-csv';
import { HowellExcel } from './exports/hw-export-excel';
import { HowellExportModel } from './exports/hw-export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportTool {
  export<T>(
    type: ExportType,
    title: string,
    headers: string[],
    datas: T,
    converter: IConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    switch (type) {
      case ExportType.excel:
        this.excel(title, headers, datas, converter, ...args);
        break;
      case ExportType.csv:
        this.csv(title, headers, datas, converter, ...args);
        break;
      default:
        break;
    }
  }

  excel<T>(
    title: string,
    headers: string[],
    datas: T,
    converter: IConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    let excel = new HowellExcel();
    let model = converter.Convert(datas, ...args);
    model.headers = headers;
    model.title = title;
    excel.setData(model);
    excel.save(title);
  }
  csv<T>(
    title: string,
    headers: string[],
    datas: T,
    converter: IConverter<T, HowellExportModel>,
    ...args: any[]
  ) {
    let model = converter.Convert(datas, ...args);
    model.title = title;
    model.headers = headers;
    HowellCSV.writeFile(title, model);
  }
}
