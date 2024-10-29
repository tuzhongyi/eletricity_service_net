import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record.model';
import { MqttRequestService } from 'src/app/network/request/mqtt/mqtt.service';
import { Language } from 'src/app/tools/language';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeRecordModel } from '../../tables/realtime-record-table/realtime-record-table.model';

@Component({
  selector: 'howell-realtime-record-list',
  templateUrl: './realtime-record-list.component.html',
  styleUrls: ['./realtime-record-list.component.less'],
})
export class RealtimeRecordListComponent implements OnInit {
  @Output() loaded: EventEmitter<RealtimeRecordModel[]> = new EventEmitter();
  @Output() picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output() playback: EventEmitter<VideoArgs> = new EventEmitter();
  @Output() trigger: EventEmitter<EventRecord> = new EventEmitter();
  constructor(private store: StoreService, private mqtt: MqttRequestService) {}

  EventType = EventType;
  ngOnInit(): void {
    this.store.interval.subscribe((x) => {
      this.load.emit(this.types);
    });
    this.mqtt.event.subscribe((x) => {
      console.log('收到消息，塞到列表中');
      if (!this.type || this.type === EventType.Business) {
        this.insert.emit(x);
      }
    });
  }

  types?: EventType[];
  type?: EventType;
  load: EventEmitter<EventType[]> = new EventEmitter();
  insert: EventEmitter<EventRecord> = new EventEmitter();
  Language = Language;

  async eventFilter(type?: EventType) {
    this.type = type;
    switch (type) {
      case EventType.Business:
        let config = await this.mqtt.config;
        this.types = config.trigger?.eventtypes;
        break;
      case EventType.Offline:
        this.types = [EventType.Online, EventType.Offline];
        break;
      default:
        this.types = undefined;
        break;
    }
    this.load.emit(this.types);
  }

  onLoaded(datas: RealtimeRecordModel[]) {
    this.loaded.emit(datas);
  }
  onPicture(model: PictureArgs) {
    this.picture.emit(model);
  }
  onPlayback(model: VideoArgs) {
    this.playback.emit(model);
  }
  onTrigger(model: EventRecord) {
    this.trigger.emit(model);
  }
}
