import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { PictureArgs } from 'src/app/models/args/picture.args';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Medium } from 'src/app/network/request/medium/medium';
import { IndexWindowBusiness } from './index-window.business';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(window: IndexWindowBusiness) {
    this.realtime = new RealTimeTrigger(window);
    this.record = new RecordTrigger(window);
    this.video = new VideoTrigger(window);
  }
  realtime: RealTimeTrigger;
  record: RecordTrigger;
  video: VideoTrigger;
}

class RealTimeTrigger {
  constructor(private window: IndexWindowBusiness) {}

  converter = new VideoControlConverter();

  preview(args: VideoArgs) {
    this.window.video.mode = PlayMode.live;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = true;
    this.window.video.subtitle = false;
    this.window.video.show = true;
  }
  playback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;

    this.window.video.begin = args.begin;
    this.window.video.end = args.end;
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
  async picture(model: PictureArgs) {
    this.window.picture.title = model.title;
    let result = await Medium.img(model.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;

    this.window.picture.show = true;
  }
}
class RecordTrigger {
  constructor(private window: IndexWindowBusiness) {}

  async picture(model: PictureArgs) {
    this.window.picture.title = model.title;
    let result = await Medium.img(model.id);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;
    this.window.picture.show = true;
  }
  playback(args: VideoArgs) {
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.begin = args.begin;
    this.window.video.end = args.end;
    this.window.video.mode = args.mode;
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
}

class VideoTrigger {
  constructor(private window: IndexWindowBusiness) {}

  converter = new VideoControlConverter();

  playback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.cameraId;
    if (args.begin) {
      this.window.video.begin = new Date(args.begin.getTime());
      this.window.video.begin.setSeconds(
        this.window.video.begin.getSeconds() - 30
      );
    }
    if (args.end) {
      this.window.video.end = new Date(args.end.getTime());
      this.window.video.end.setSeconds(this.window.video.end.getSeconds() + 30);
    }
    this.window.video.subtitle = args.subtitle;
    this.window.video.show = true;
  }
}
