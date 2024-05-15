import { Injectable } from '@angular/core';

import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingServer } from 'src/app/models/subtitling/subtitling-server.model';
import { GetSubtitlingChannelsParams } from 'src/app/network/request/subtitling/subtitling-request.params';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { SettingsSubtitleChannelTableConverter } from './settings-subtitle-channel-table.converter';
import {
  SettingsSubtitleChannelTableOptions,
  SubtitlingChannelModel,
} from './settings-subtitle-channel-table.model';

@Injectable()
export class SettingsSubtitleChannelTableBusiness
  implements
    IBusiness<PagedList<SubtitlingChannel>, PagedList<SubtitlingChannelModel>>
{
  constructor(
    private converter: SettingsSubtitleChannelTableConverter,
    private service: SubtitlingRequestService
  ) {}

  private _server?: SubtitlingServer;

  private async server() {}

  async load(
    opts: SettingsSubtitleChannelTableOptions
  ): Promise<PagedList<SubtitlingChannelModel>> {
    let datas = await this.getData(opts);
    let paged = this.converter.Convert(datas);
    return paged;
  }
  async getData(
    opts: SettingsSubtitleChannelTableOptions
  ): Promise<PagedList<SubtitlingChannel>> {
    let params = new GetSubtitlingChannelsParams();
    params.PageIndex = opts.pageIndex;
    params.PageSize = opts.pageSize;
    params.Name = opts.name;
    params.Enabled = opts.enabled;
    if (opts.serverId) {
      params.ServerIds = [opts.serverId];
    }

    let servers = await this.service.server.array();
    if (servers) {
      params.ServerIds = servers.map((x) => x.Id);
    }
    return this.service.server.channel.list(params);
  }
}
