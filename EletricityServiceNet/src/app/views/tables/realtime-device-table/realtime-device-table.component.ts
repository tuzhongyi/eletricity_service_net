import {
  AfterViewInit,
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
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { Camera } from 'src/app/models/camera.model';
import { ImageControlModelArray } from 'src/app/models/image-control.model';
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
  implements
    IComponent<IModel, RealtimeDeviceModel[]>,
    OnInit,
    OnChanges,
    OnDestroy
{
  @Input()
  business: IBusiness<IModel, RealtimeDeviceModel<any>[]>;
  @Output()
  preview: EventEmitter<Camera> = new EventEmitter();
  @Output()
  playback: EventEmitter<Camera> = new EventEmitter();

  @Input()
  load?: EventEmitter<void>;

  constructor(business: RealtimeDeviceListTableBusiness) {
    this.business = business;
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
          this.loadData();
        });
      }
    }
  }

  width = ['40%', '20%', '20%', '20%'];

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

  onPreview(item: RealtimeDeviceModel) {
    this.preview.emit(item.data);
  }
  onPlayback(item: RealtimeDeviceModel) {
    this.playback.emit(item.data);
  }
}
