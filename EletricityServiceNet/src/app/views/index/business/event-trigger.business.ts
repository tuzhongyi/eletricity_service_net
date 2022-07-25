import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { Camera } from 'src/app/models/camera.model';
import { EventRecord } from 'src/app/models/event-record.model';
import { IModel } from 'src/app/models/model.interface';
import { Medium } from 'src/app/network/request/medium/medium';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { IndexWindowBusiness } from './index-window.business';

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

  preview(camera: Camera) {
    this.window.video.mode = PlayMode.live;
    this.window.video.cameraId = camera.Id;
    this.window.video.title = camera.Name;
    this.window.video.show = true;
  }
  playback(camera: Camera) {
    this.window.video.mode = PlayMode.vod;
    this.window.video.cameraId = camera.Id;
    this.window.video.title = camera.Name;

    this.window.video.show = true;
  }
}
class RecordTrigger {
  constructor(private window: IndexWindowBusiness) {}

  async picture(model: EventRecord) {
    this.window.picture.title = model.ResourceName ?? '';
    let result = await Medium.img(model.ImageUrl);
    this.window.picture.url = result.url;
    this.window.picture.isError = result.error;
    this.window.picture.show = true;
  }
  playback(model: EventRecord) {
    this.window.video.cameraId = model.ResourceId;
    this.window.video.title = model.ResourceName ?? '';
    this.window.video.autoplay = true;
    this.window.video.time = model.EventTime;
    this.window.video.mode = PlayMode.vod;
    this.window.video.show = true;
  }
}
