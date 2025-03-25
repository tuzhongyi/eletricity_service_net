import { EventEmitter, Injectable } from '@angular/core';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { EventRecord } from 'src/app/models/event-record.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { StatisticWindow } from '../window/statistic.window';

@Injectable()
export class StatisticRecordListController {
  trigger = new EventEmitter<EventRecord>();
  constructor(private window: StatisticWindow) {}

  onPlayback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;

    this.window.video.begin = args.begin;
    this.window.video.end = args.end;
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
  async onPicture(args: PictureArgs) {
    this.window.picture.title = args.title;
    let result = await Medium.img(args.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;

    this.window.picture.show = true;
  }

  onTrigger(data: EventRecord) {
    this.trigger.emit(data);
  }
}
