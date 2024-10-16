import { EventEmitter, Injectable } from '@angular/core';
import { HowellPlaybackArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { EventRecord } from 'src/app/models/event-record.model';

@Injectable()
export class RealtimeTriggerController {
  show = false;
  data?: EventRecord;

  name = '';

  event = { playback: new EventEmitter<HowellPlaybackArgs>() };

  onstop() {
    this.show = false;
  }

  playback(cameraId: string, time: Date) {
    let args = new HowellPlaybackArgs();
    args.cameraId = cameraId;
    args.time = time;
    this.event.playback.emit(args);
  }

  onplayback() {
    if (this.data && this.data.ResourceId) {
      this.playback(this.data.ResourceId, this.data.EventTime);
    }
  }
}
