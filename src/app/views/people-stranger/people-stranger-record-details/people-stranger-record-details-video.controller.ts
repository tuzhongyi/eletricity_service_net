import { EventEmitter } from '@angular/core';
import { HowellPlaybackArgs } from 'src/app/howell-components/howell-video-player/howell-video-player.model';
import { VideoModel } from 'src/app/models/video.model';

export class PeopleStrangerRecordDetailsVideoController {
  toplay = new EventEmitter<VideoModel>();
  show = false;
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
}
