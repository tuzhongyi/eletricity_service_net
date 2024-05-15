import { Injectable } from '@angular/core';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';

@Injectable()
export class SettingsSubtitleChannelSupportedBusiness {
  constructor(private service: SubtitlingRequestService) {}

  private _server?: SubtitlingServer;

  private async server() {
    if (!this._server) {
      let array = await this.service.server.array();
      if (array && array.length > 0) {
        this._server = array[0];
      }
    }
    return this._server;
  }

  async all() {
    let server = await this.server();
    if (server) {
      let serverId = server.Id;
      return this.service.server.channel.array(serverId);
    }
    throw new Error('字幕服务器未设置');
  }

  async set(datas: SubtitlingChannel[]) {
    let server = await this.server();
    if (server) {
      let serverId = server.Id;
      let all = datas.map((x) => {
        return this.service.server.channel.create(serverId, x);
      });
      return Promise.all(all);
    }
    throw new Error('字幕服务器未设置');
  }
}
