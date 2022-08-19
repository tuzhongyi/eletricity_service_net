import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventType } from 'src/app/enums/event-type.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { StoreService } from 'src/app/tools/service/store.service';
import { RealtimeRecordModel } from '../../tables/realtime-record-table/realtime-record-table.model';

@Component({
  selector: 'howell-realtime-record-list',
  templateUrl: './realtime-record-list.component.html',
  styleUrls: ['./realtime-record-list.component.less'],
})
export class RealtimeRecordListComponent implements OnInit {
  @Output()
  loaded: EventEmitter<RealtimeRecordModel[]> = new EventEmitter();
  @Output()
  picture: EventEmitter<PictureArgs> = new EventEmitter();
  @Output()
  playback: EventEmitter<VideoArgs> = new EventEmitter();
  constructor(private store: StoreService) {}

  EventType = EventType;
  ngOnInit(): void {
    this.store.interval.subscribe((x) => {
      this.load.emit();
    });
  }

  types?: EventType[];
  type?: EventType;
  load: EventEmitter<EventType[]> = new EventEmitter();

  eventFilter(type?: EventType) {
    this.type = type;
    switch (type) {
      case EventType.Business:
        this.types = [
          EventType.Business,
          EventType.Falldown,
          EventType.LeavePosition,
          EventType.Loitering,
          // EventType.Spacing,
          EventType.Voilence,
          EventType.Run,
          EventType.HighDensity,
          EventType.Intrusion,
          EventType.Tripwire,
          EventType.Unattended,
          EventType.Removal,
        ];
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
}
