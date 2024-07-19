import { Injectable } from '@angular/core';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';

@Injectable()
export class VideoSettingPlaybackBusiness {
  constructor(sr: SRServerRequestService, subtitle: SubtitlingRequestService) {
    this.service = {
      sr: sr,
      subtitle: subtitle,
    };
  }

  service: {
    sr: SRServerRequestService;
    subtitle: SubtitlingRequestService;
  };
}
