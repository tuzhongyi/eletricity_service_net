import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { RecordEventTableExportConverter } from 'src/app/converters/exports/record-event-table-export.converter';
import { ExportType } from 'src/app/enums/export-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IExportConverter } from 'src/app/interfaces/converter.interface';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { IModel } from 'src/app/models/model.interface';
import { Page, PagedList } from 'src/app/models/page.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RecordEventTableExportBusiness } from './record-event-table-export.business';
import { RecordEventTableBusiness } from './record-event-table.business';
import {
  RecordEventTableItemModel,
  RecordEventTableOptions,
} from './record-event-table.model';

@Component({
  selector: 'howell-record-event-table',
  templateUrl: './record-event-table.component.html',
  styleUrls: ['../table-list.less', './record-event-table.component.less'],
  providers: [RecordEventTableBusiness, RecordEventTableExportBusiness],
})
export class RecordEventTableComponent
  implements
    IComponent<IModel, PagedList<RecordEventTableItemModel>>,
    OnInit,
    OnChanges,
    OnDestroy
{
  @Input()
  business: IBusiness<IModel, PagedList<RecordEventTableItemModel>>;
  @Input()
  options: RecordEventTableOptions;
  @Input()
  load?: EventEmitter<RecordEventTableOptions>;
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Input()
  exportExcel?: EventEmitter<void>;

  constructor(
    business: RecordEventTableBusiness,
    private exports: RecordEventTableExportBusiness
  ) {
    this.business = business;
    let duration = DateTimeTool.TimeUnit(TimeUnit.Day, new Date());
    this.options = {
      begin: duration.begin,
      end: duration.end,
      name: '',
      pageIndex: 1,
      pageSize: 10,
    };
  }

  datas?: RecordEventTableItemModel[];
  width = ['19%', '13.5%', '13.5%', '13.5%', '13.5%', '13.5%', '13.5%'];
  Language = Language;
  page?: Page;
  @ViewChild('body') bodyElement?: ElementRef;

  get body_height() {
    if (this.bodyElement) {
      let div = this.bodyElement.nativeElement as HTMLDivElement;
      return div.clientHeight;
    }
    return undefined;
  }

  ngOnDestroy(): void {
    if (this.load) {
      this.load.unsubscribe();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['load']) {
      if (this.load) {
        this.load.subscribe((x) => {
          this.options = x;
          this.loadData();
        });
      }
    }
    if (changes['exportExcel']) {
      if (this.exportExcel) {
        this.exportExcel.subscribe((x) => {
          this.onexport();
        });
      }
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.business.load(this.options).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  async pageEvent(page: PageEvent) {
    this.options.pageIndex = page.pageIndex + 1;
    this.options.pageSize = page.pageSize;

    this.loadData();
  }

  onPicture(item: RecordEventTableItemModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
  }
  onPlayback(item: RecordEventTableItemModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
  }

  onexport() {
    if (this.datas) {
      this.exports.Export(ExportType.excel, this.datas, this.options);
    }
  }

  exportConverter: IExportConverter<RecordEventTableItemModel<any>[]> =
    new RecordEventTableExportConverter();
}
