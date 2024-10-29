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
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { VideoArgs } from 'src/app/models/args/video.args';
import { IModel } from 'src/app/models/model.interface';
import { Language } from 'src/app/tools/language';
import { RealtimeDeviceListTableBusiness } from './realtime-device-table.business';
import { RealtimeDeviceModel } from './realtime-device-table.model';

@Component({
  selector: 'howell-realtime-device-table',
  templateUrl: './realtime-device-table.component.html',
  styleUrls: ['../table-list.less', './realtime-device-table.component.less'],
  providers: [RealtimeDeviceListTableBusiness],
})
export class RealtimeDeviceListTableComponent
  implements
    IComponent<IModel, RealtimeDeviceModel[]>,
    OnInit,
    OnChanges,
    OnDestroy
{
  @Input() canplayback: boolean = true;
  @Input() business: IBusiness<IModel, RealtimeDeviceModel<any>[]>;
  @Output() preview: EventEmitter<VideoArgs> = new EventEmitter();
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Input() load?: EventEmitter<void>;
  @Output() loaded: EventEmitter<RealtimeDeviceModel[]> = new EventEmitter();

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
      this.loaded.emit(this.datas);
    });
  }

  onPreview(item: RealtimeDeviceModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.preview.emit(args);
  }
  onPlayback(item: RealtimeDeviceModel) {
    let args = VideoArgsConverter.Convert(item.data);
    args.autoplay = false;
    this.playback.emit(args);
  }
  onitemclick(item: RealtimeDeviceModel) {
    if (!this.canplayback) {
      this.onPreview(item);
    }
  }
}
