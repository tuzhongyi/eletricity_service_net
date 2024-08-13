import { Injectable } from '@angular/core';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { VideoModel } from 'src/app/models/video.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { SRServerRequestService } from 'src/app/network/request/sr-server/sr-server.service';

@Injectable()
export class VideoKeywordsBusiness {
  constructor(
    private service: SRServerRequestService,
    private config: ConfigRequestService
  ) {}

  async playback(data: SubtitlingItem, begin: Date, end: Date) {
    let config = await this.config.get();
    let _begin = new Date(begin.getTime());
    _begin.setSeconds(_begin.getSeconds() + config.playback.begin);
    let _end = new Date(end.getTime());
    _end.setSeconds(_end.getSeconds() + config.playback.end);
    let url = await this.url(data, _begin, _end);
    let model = new VideoModel(url.Url);
    if (url.Username) {
      model.username = url.Username;
    }
    if (url.Password) {
      model.password = url.Password;
    }
    return model;
  }

  url(data: SubtitlingItem, begin: Date, end: Date) {
    return this.service.playback(data.ChannelId, {
      BeginTime: begin,
      EndTime: end,
    });
  }

  async position(item: SubtitlingItem, begin: Date) {
    let config = await this.config.get();
    let _begin = new Date(begin.getTime());
    _begin.setSeconds(_begin.getSeconds());
    let current = new Date(item.BeginTime.getTime());
    current.setSeconds(
      current.getSeconds() +
        config.playback.subtitle.begin -
        config.playback.begin
    );
    return current.getTime() - _begin.getTime();
  }
}
