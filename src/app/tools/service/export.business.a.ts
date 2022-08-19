import { Injectable } from '@angular/core';
import { ExportType } from 'src/app/enums/export-type.enum';
import { IExportComponent } from 'src/app/interfaces/component.interfact';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { ExportTool } from '../export.tool';

export abstract class ExportBasicBusiness<T> implements IExportComponent<T> {
  constructor(exports: ExportTool) {
    this.exports = exports;
  }
  exports: ExportTool;
  abstract exportConverter: IExportConverter<T>;
  abstract Export(type: ExportType, datas: T, ...args: any[]): Promise<void>;
}
