import { Injectable } from '@angular/core';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { HowellVideoPlayerTrackBusiness } from './howell-video-player-track.business';

@Injectable()
export class HowellVideoPlayerConfigBusiness {
  constructor(
    private service: ConfigRequestService,
    private track: HowellVideoPlayerTrackBusiness
  ) {}

  private config() {
    return this.service.get();
  }

  async duration(time: Date, track = false) {
    if (track) {
      return this.track.duration(time);
    }
    let config = await this.config();
    let duration = DateTimeTool.beforeDuration(
      time,
      config.playback.begin,
      config.playback.end
    );
    return duration;
  }
}
