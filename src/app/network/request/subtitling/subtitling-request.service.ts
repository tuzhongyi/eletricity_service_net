import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { WeekTimeSegment } from 'src/app/models/time-segment-week.model';
import { SubtitlingUrl } from '../../url/subtitling/subtitling.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import {
  GetKeywordSubtitlingParams,
  GetSubtitlingChannelsParams,
  GetSubtitlingSrtParams,
} from './subtitling-request.params';

@Injectable({
  providedIn: 'root',
})
export class SubtitlingRequestService {
  constructor(http: HttpClient) {
    this.basic = new BaseRequestService(http);
  }

  private basic: BaseRequestService;

  private _server?: SubtitlingServersRequestService;
  public get server(): SubtitlingServersRequestService {
    if (!this._server) {
      this._server = new SubtitlingServersRequestService(this.basic);
    }
    return this._server;
  }

  srt(params: GetSubtitlingSrtParams) {
    let url = SubtitlingUrl.srt();
    let plain = instanceToPlain(params);
    return this.basic.post<any, string>(url, plain);
  }
  keywords(params: GetKeywordSubtitlingParams) {
    let url = SubtitlingUrl.keywords();
    let plain = instanceToPlain(params);
    return this.basic.howellPaged(url, SubtitlingItem, plain);
  }
}

class SubtitlingServersRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(SubtitlingServer);
  }
  private type: BaseTypeRequestService<SubtitlingServer>;

  array() {
    let url = SubtitlingUrl.server.basic();
    return this.type.array(url);
  }
  create(data: SubtitlingServer) {
    let url = SubtitlingUrl.server.basic();
    let plain = instanceToPlain(data);
    return this.type.post(url, plain);
  }
  get(id: string) {
    let url = SubtitlingUrl.server.item(id);
    return this.type.get(url);
  }
  update(data: SubtitlingServer) {
    let url = SubtitlingUrl.server.item(data.Id);
    let plain = instanceToPlain(data);
    return this.type.put(url, plain as SubtitlingServer);
  }
  delete(id: string) {
    let url = SubtitlingUrl.server.item(id);
    return this.type.delete(url);
  }

  sync = {
    from: {
      business: (serverId: string) => {
        let url = SubtitlingUrl.server.sync.from.business(serverId);
        return this.basic.string(url);
      },
    },
    to: {
      server: (serverId: string) => {
        let url = SubtitlingUrl.server.sync.to.server(serverId);
        return this.basic.string(url);
      },
    },
  };

  private _channel?: SubtitlingServersChannelsRequestService;
  public get channel(): SubtitlingServersChannelsRequestService {
    if (!this._channel) {
      this._channel = new SubtitlingServersChannelsRequestService(this.basic);
    }
    return this._channel;
  }
}

class SubtitlingServersChannelsRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(SubtitlingChannel);
  }
  private type: BaseTypeRequestService<SubtitlingChannel>;

  array(serverId: string) {
    let url = SubtitlingUrl.server.channel(serverId).basic();
    return this.type.array(url);
  }
  create(serverId: string, data: SubtitlingChannel) {
    let url = SubtitlingUrl.server.channel(serverId).basic();
    let plain = instanceToPlain(data);
    return this.type.post(url, plain);
  }
  get(serverId: string, channelId: string) {
    let url = SubtitlingUrl.server.channel(serverId).item(channelId);
    return this.type.get(url);
  }
  update(data: SubtitlingChannel) {
    let url = SubtitlingUrl.server.channel(data.ServerId).item(data.Id);
    let plain = instanceToPlain(data);
    return this.type.put(url, plain as SubtitlingChannel);
  }
  delete(serverId: string, channelId: string) {
    let url = SubtitlingUrl.server.channel(serverId).item(channelId);
    return this.type.delete(url);
  }

  list(
    params: GetSubtitlingChannelsParams = new GetSubtitlingChannelsParams()
  ) {
    let url = SubtitlingUrl.server.channel().list();
    let plain = instanceToPlain(params);
    return this.type.paged(url, plain);
  }

  supported() {
    let url = SubtitlingUrl.server.channel().supported();
    return this.type.array(url);
  }

  private _schedule?: SubtitlingServersChannelsScheduleRequestService;
  public get schedule(): SubtitlingServersChannelsScheduleRequestService {
    if (!this._schedule) {
      this._schedule = new SubtitlingServersChannelsScheduleRequestService(
        this.basic
      );
    }
    return this._schedule;
  }
}
class SubtitlingServersChannelsScheduleRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(WeekTimeSegment);
  }
  private type: BaseTypeRequestService<WeekTimeSegment>;

  get(serverId: string, channelId: string) {
    let url = SubtitlingUrl.server.channel(serverId).schedule(channelId);
    return this.type.get(url);
  }
  update(serverId: string, channelId: string, data: WeekTimeSegment) {
    let url = SubtitlingUrl.server.channel(serverId).schedule(channelId);
    let plain = instanceToPlain(data);
    return this.type.put(url, plain as WeekTimeSegment);
  }
}
