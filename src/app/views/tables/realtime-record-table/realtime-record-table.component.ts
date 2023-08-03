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
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { EventType } from 'src/app/enums/event-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IComponent } from 'src/app/interfaces/component.interfact';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { IModel } from 'src/app/models/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { Language } from 'src/app/tools/language';
import { RealtimeRecordTableBusiness } from './realtime-record-table.business';
import { RealtimeRecordModel } from './realtime-record-table.model';

@Component({
  selector: 'howell-realtime-record-table',
  templateUrl: './realtime-record-table.component.html',
  styleUrls: ['../table-list.less', './realtime-record-table.component.less'],
  providers: [RealtimeRecordTableBusiness],
})
export class RealtimeRecordTableComponent
  implements
    IComponent<IModel, RealtimeRecordModel[]>,
    OnInit,
    OnChanges,
    OnDestroy
{
  @Input()
  business: IBusiness<IModel, RealtimeRecordModel[]>;
  @Input()
  date: Date = new Date();
  @Input()
  types?: EventType[];
  @Input()
  load?: EventEmitter<EventType[]>;
  @Output()
  loaded: EventEmitter<RealtimeRecordModel[]> = new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();

  constructor(business: RealtimeRecordTableBusiness) {
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
          this.types = x;
          this.loadData();
        });
      }
    }
  }
  width = ['30%', '10%', '20%', '20%', '20%'];

  datas?: RealtimeRecordModel[];
  Language = Language;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    let duration = DateTimeTool.TimeUnit(TimeUnit.Day, this.date);
    this.business.load(DurationParams.from(duration), this.types).then((x) => {
      this.datas = x;
      this.datas.sort((a, b) => {
        return b.time.localeCompare(a.time);
      });
      this.loaded.emit(this.datas);
    });
  }

  onPicture(item: RealtimeRecordModel) {
    let args = PictureArgsConverter.Convert(item.data);
    this.picture.emit(args);
  }
  onPlayback(item: RealtimeRecordModel) {
    let args = VideoArgsConverter.Convert(item.data);
    this.playback.emit(args);
  }
}
