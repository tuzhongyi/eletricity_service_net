import { Injectable } from '@angular/core';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class VideoSettingPreviewBusiness {
  constructor(private sr: SRServerRequestService) {}

  getUrl(cameraId: string) {
    return this.sr.preview(cameraId);
  }
}
