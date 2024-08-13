import { Injectable } from '@angular/core';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

@Injectable()
export class HowellVideoPlayerTrackBusiness {
  constructor(private service: ConfigRequestService) {}

  private config() {
    return this.service.track.get();
  }

  async duration(time: Date) {
    let config = await this.config();
    let duration = DateTimeTool.beforeDuration(
      time,
      config.begin,
      config.duration
    );

    console.log(duration);
    return duration;
  }
}
