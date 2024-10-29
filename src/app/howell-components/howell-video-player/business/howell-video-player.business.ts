import { Injectable } from '@angular/core';
import { VideoUrl } from 'src/app/models/video-url.model';
import { VideoModel } from 'src/app/models/video.model';
import {
  GetPreviewUrlParams,
  GetVodUrlParams,
} from 'src/app/network/request/sr-server/sr-server.params';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';
import {
  HowellPlaybackArgs,
  HowellPreviewArgs,
} from '../howell-video-player.model';
import { HowellVideoPlayerConfigBusiness } from './howell-video-player-config.business';
import { HowellVideoPlayerSubtitleBusiness } from './howell-video-player-subtitle.business';
import { HowellVideoPlayerTrackBusiness } from './howell-video-player-track.business';

@Injectable()
export class HowellVideoPlayerBusiness {
  constructor(
    private sr: SRServerRequestService,
    private config: HowellVideoPlayerConfigBusiness
  ) {}

  async preview(args: HowellPreviewArgs) {
    let params = new GetPreviewUrlParams();
    params.CameraId = args.cameraId;
    params.StreamType = args.stream;
    let url = await this.sr.preview(params);
    let model = this.convert(url);
    model.sourceId = args.cameraId;
    return model;
  }

  async playback(args: HowellPlaybackArgs, reserve?: number) {
    let params = new GetVodUrlParams();
    if (args.duration) {
      params.BeginTime = args.duration.begin;
      params.EndTime = args.duration.end;
    } else if (args.time) {
      let duration = await this.config.duration(args.time, args.track);
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
    } else {
      throw new Error('args.duration or args.time is required');
    }

    if (reserve) {
      params.BeginTime = new Date(params.BeginTime.getTime() - reserve);
    }

    params.CameraId = args.cameraId;
    params.StreamType = args.stream;
    let url = await this.sr.playback(params);
    let model = this.convert(url);
    model.sourceId = args.cameraId;
    return model;
  }

  private convert(url: VideoUrl) {
    let model = VideoModel.fromUrl(url.Url);
    if (url.Username) {
      model.username = url.Username;
    }
    if (url.Password) {
      model.password = url.Password;
    }
    return model;
  }
}

export const HowellVideoPlayerProviders = [
  HowellVideoPlayerSubtitleBusiness,
  HowellVideoPlayerConfigBusiness,
  HowellVideoPlayerTrackBusiness,
  HowellVideoPlayerBusiness,
];
