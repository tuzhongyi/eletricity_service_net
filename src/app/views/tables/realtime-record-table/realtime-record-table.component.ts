import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PictureArgsConverter } from 'src/app/converters/args/picture-args.converter';
import { VideoArgsConverter } from 'src/app/converters/args/video-args.converter';
import { EventType } from 'src/app/enums/event-type.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record.model';
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
export class RealtimeRecordTableComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() types?: EventType[];
  @Input() load?: EventEmitter<EventType[]>;
  @Output() loaded: EventEmitter<RealtimeRecordModel[]> = new EventEmitter();
  @Output() picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Input() insert?: EventEmitter<EventRecord>;
  @Output() trigger: EventEmitter<EventRecord> = new EventEmitter();

  constructor(private business: RealtimeRecordTableBusiness) {}
  width = ['30%', '10%', '20%', '20%', '20%'];

  datas: RealtimeRecordModel[] = [];
  Language = Language;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.types = x;
        this.loadData();
      });
    }
    if (this.insert) {
      this.insert.subscribe((record) => {
        let data = this.business.convert(record);
        let index = this.datas.findIndex((x) => x.id === record.Id);
        if (index < 0) {
          this.datas.unshift(data);
        }
        console.log('触发窗口');
        this.onTrigger(data);
      });
    }
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
  onTrigger(item: RealtimeRecordModel) {
    this.trigger.emit(item.data);
  }
}
