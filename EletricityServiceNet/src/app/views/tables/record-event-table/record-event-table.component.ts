import { Component, Input, OnInit } from '@angular/core';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
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
  implements IComponent<IModel, RecordEventTableItemModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, RecordEventTableItemModel[]>;
  @Input()
  options: RecordEventTableOptions;
  constructor(business: RecordEventTableBusiness) {
    this.business = business;
    let duration = DateTimeTool.TimeUnit(TimeUnit.Day, new Date());
    this.options = {
      begin: duration.begin,
      end: duration.end,
      name: '',
    };
  }
  datas?: RecordEventTableItemModel[];
  width = ['20%', '16%', '16%', '16%', '16%', '16%'];
  Language = Language;
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.business.load(this.options).then((x) => {
      this.datas = x;
    });
  }
}
