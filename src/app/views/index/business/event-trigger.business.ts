import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { Camera } from 'src/app/models/camera.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { IModel } from 'src/app/models/model.interface';
import { VideoArgs } from 'src/app/models/args/video.args';
import { Medium } from 'src/app/network/request/medium/medium';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { IndexWindowBusiness } from './index-window.business';
import { PictureArgs } from 'src/app/models/args/picture.args';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(window: IndexWindowBusiness) {
    this.realtime = new RealTimeTrigger(window);
    this.record = new RecordTrigger(window);
  }
  realtime: RealTimeTrigger;
  record: RecordTrigger;
}

class RealTimeTrigger {
  constructor(private window: IndexWindowBusiness) {}

  converter = new VideoControlConverter();

  preview(args: VideoArgs) {
    this.window.video.mode = PlayMode.live;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = true;
    this.window.video.show = true;
  }
  playback(args: VideoArgs) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = args.cameraId;
    this.window.video.title = args.title;
    this.window.video.autoplay = args.autoplay;
    this.window.video.time = args.time;
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
  playback(model: VideoArgs) {
    this.window.video.cameraId = model.cameraId;
    this.window.video.title = model.title;
    this.window.video.autoplay = model.autoplay;
    this.window.video.time = model.time;
    this.window.video.mode = model.mode;
    this.window.video.show = true;
  }
}
