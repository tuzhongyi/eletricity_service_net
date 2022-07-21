import { Injectable } from '@angular/core';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { Camera } from 'src/app/models/camera.model';
import { Duration } from 'src/app/models/duration.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class VideoBusiness {
  constructor(private sr: SRServerRequestService) {}

  getUrl(cameraId: string, mode: PlayMode, duration?: Duration) {
    switch (mode) {
      case PlayMode.vod:
        return this.sr.playback(cameraId, DurationParams.from(duration!));
      case PlayMode.live:
      default:
        return this.sr.preview(cameraId);
    }
  }
}
