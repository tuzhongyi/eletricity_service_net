import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { EventRecord } from 'src/app/models/event-record.model';
import { IModel } from 'src/app/models/model.interface';
import { Page, PagedList } from 'src/app/models/page.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RecordEventTableBusiness } from './record-event-table.business';
import {
  RecordEventTableItemModel,
  RecordEventTableOptions,
} from './record-event-table.model';

@Component({
  selector: 'howell-record-event-table',
  templateUrl: './record-event-table.component.html',
  styleUrls: ['../table.less', './record-event-table.component.less'],
  providers: [RecordEventTableBusiness],
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
  picture: EventEmitter<EventRecord> = new EventEmitter();
  @Output()
  playback: EventEmitter<EventRecord> = new EventEmitter();

  constructor(business: RecordEventTableBusiness) {
    this.business = business;
    let duration = DateTimeTool.TimeUnit(TimeUnit.Day, new Date());
    this.options = {
      begin: duration.begin,
      end: duration.end,
      name: '',
      pageIndex: -1,
      pageSize: 10,
    };
  }
  datas?: RecordEventTableItemModel[];
  width = ['20%', '16%', '16%', '16%', '16%', '16%'];
  Language = Language;
  page?: Page;

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
    this.picture.emit(item.data);
  }
  onPlayback(item: RecordEventTableItemModel) {
    this.playback.emit(item.data);
  }
}
