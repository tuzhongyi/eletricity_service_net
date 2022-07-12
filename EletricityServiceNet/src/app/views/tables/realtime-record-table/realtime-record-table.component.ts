import { Component, Input, OnInit } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RealtimeRecordTableBusiness } from './realtime-record-table.business';
import { RealtimeRecordModel } from './realtime-record-table.model';

@Component({
  selector: 'howell-realtime-record-table',
  templateUrl: './realtime-record-table.component.html',
  styleUrls: ['../table.less', './realtime-record-table.component.less'],
  providers: [RealtimeRecordTableBusiness],
})
export class RealtimeRecordTableComponent
  implements IComponent<IModel, RealtimeRecordModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, RealtimeRecordModel[]>;
  @Input()
  date: Date = new Date();
  @Input()
  type?: EventType;

  constructor(business: RealtimeRecordTableBusiness) {
    this.business = business;
  }
  width = ['25%', '25%', '25%', '25%'];

  datas?: RealtimeRecordModel[];
  Language = Language;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let duration = DateTimeTool.TimeUnit(TimeUnit.Day, this.date);
    this.business.load(DurationParams.from(duration), this.type).then((x) => {
      this.datas = x;
    });
  }
}
