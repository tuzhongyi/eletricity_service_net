import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { IModel } from 'src/app/models/model.interface';
import { Language } from 'src/app/tools/language';
import { RealtimeDeviceListTableBusiness } from './realtime-device-table.business';
import { RealtimeDeviceModel } from './realtime-device-table.model';

@Component({
  selector: 'howell-realtime-device-table',
  templateUrl: './realtime-device-table.component.html',
  styleUrls: ['../table.less', './realtime-device-table.component.less'],
  providers: [RealtimeDeviceListTableBusiness],
})
export class RealtimeDeviceListTableComponent
  implements IComponent<IModel, RealtimeDeviceModel[]>, OnInit
{
  @Input()
  business: IBusiness<IModel, RealtimeDeviceModel<any>[]>;
  constructor(business: RealtimeDeviceListTableBusiness) {
    this.business = business;
  }

  width = ['25%', '25%', '25%', '25%'];

  Language = Language;

  datas: RealtimeDeviceModel[] = [];

  @ViewChild('table')
  table?: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
