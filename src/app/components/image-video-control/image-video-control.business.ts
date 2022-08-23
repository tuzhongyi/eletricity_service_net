import { Injectable } from '@angular/core';
import { VideoControlConverter } from 'src/app/converters/video-control.converter';
import { PlayMode } from 'src/app/enums/play-mode.enum';
import { StreamType } from 'src/app/enums/stream-type.enum';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { VideoUrl } from 'src/app/models/video-url.model';
import { VideoModel } from 'src/app/models/video.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GetVodUrlParams } from 'src/app/network/request/sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import { IConverter } from '../../interfaces/converter.interface';

@Injectable()
export class ImageVideoControlBusiness
  implements IBusiness<VideoUrl, VideoModel>
{
  constructor(private srService: SRServerRequestService) {}
  Converter: IConverter<VideoUrl, VideoModel> = new VideoControlConverter();
  async load(
    cameraId: string,
    mode: PlayMode,
    interval?: DurationParams
  ): Promise<VideoModel> {
    let stream = StreamType.main;

    let url = await this.getData(cameraId, mode, stream, interval);
    return this.Converter.Convert(url);
  }

  async getData(
    cameraId: string,
    mode: PlayMode,
    stream: StreamType,
    interval?: DurationParams
  ): Promise<VideoUrl> {
    switch (mode) {
      case PlayMode.vod:
        return this.getVodUrl(cameraId, stream, interval!);
      case PlayMode.live:
      default:
        return this.getLiveUrl(cameraId, stream);
    }
  }

  getLiveUrl(cameraId: string, stream: StreamType) {
    return this.srService.preview(cameraId, stream);
  }
  getVodUrl(cameraId: string, stream: StreamType, interval: DurationParams) {
    let params = new GetVodUrlParams();
    params.BeginTime = interval.BeginTime;
    params.EndTime = interval.EndTime;
    params.CameraId = cameraId;
    params.StreamType = stream;
    return this.srService.playback(params);
  }
}
