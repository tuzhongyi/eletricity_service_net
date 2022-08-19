import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { StreamType } from 'src/app/enums/stream-type.enum';
import { SRServer } from 'src/app/models/sr-server.model';
import { VideoUrl } from 'src/app/models/video-url.model';
import { SRServerUrl } from '../../url/businesshall_service/sr-server.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { DurationParams } from '../IParams.interface';
import { GetPreviewUrlParams, GetVodUrlParams } from './sr-server.params';

@Injectable({
  providedIn: 'root',
})
export class SRServerRequestService {
  private type: BaseTypeRequestService<SRServer>;

  constructor(_http: HttpClient) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(SRServer);
  }
  private basic: BaseRequestService;

  preview(cameraId: string, stream?: StreamType): Promise<VideoUrl>;
  preview(params: GetPreviewUrlParams): Promise<VideoUrl>;

  preview(
    args: GetPreviewUrlParams | string,
    stream: StreamType = StreamType.sub
  ) {
    let data: any;
    if (typeof args === 'string') {
      let params = new GetPreviewUrlParams();
      params.CameraId = args;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServerUrl.preview();
    return this.basic.post(url, VideoUrl, data);
  }

  playback(
    cameraId: string,
    interval: DurationParams,
    stream?: StreamType
  ): Promise<VideoUrl>;
  playback(params: GetVodUrlParams): Promise<VideoUrl>;

  playback(
    args: GetVodUrlParams | string,
    interval?: DurationParams,
    stream: StreamType = StreamType.main
  ) {
    let data: any;

    if (typeof args === 'string') {
      let params = new GetVodUrlParams();
      params.CameraId = args;
      params.BeginTime = interval!.BeginTime;
      params.EndTime = interval!.EndTime;
      params.StreamType = stream;
      data = classToPlain(params);
    } else {
      data = classToPlain(args);
    }

    let url = SRServerUrl.vod();
    return this.basic.post(url, VideoUrl, data);
  }

  create(item: SRServer) {
    return this.type.post(SRServerUrl.basic(), item);
  }
  get(id: string) {
    return this.type.get(SRServerUrl.item(id));
  }
  set(item: SRServer) {
    return this.type.post(SRServerUrl.item(item.Id), item);
  }

  array() {
    return this.type.array(SRServerUrl.basic());
  }

  sync(id: string) {
    return this.type.post(SRServerUrl.sync(id));
  }
  delete(id: string) {
    return this.type.delete(SRServerUrl.item(id));
  }
}
