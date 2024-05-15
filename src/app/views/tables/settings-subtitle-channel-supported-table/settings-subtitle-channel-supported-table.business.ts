import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { SettingsSubtitleChannelTableConverter } from '../settings-subtitle-channel-table/settings-subtitle-channel-table.converter';
import { SubtitlingChannelModel } from '../settings-subtitle-channel-table/settings-subtitle-channel-table.model';
import { SettingsSubtitleChannelSupportedTableOptions } from './settings-subtitle-channel-supported-table.model';

@Injectable()
export class SettingsSubtitleChannelSupportedTableBusiness
  implements IBusiness<SubtitlingChannel[], SubtitlingChannelModel[]>
{
  constructor(
    private converter: SettingsSubtitleChannelTableConverter,
    private service: SubtitlingRequestService
  ) {}

  async load(
    opts: SettingsSubtitleChannelSupportedTableOptions
  ): Promise<SubtitlingChannelModel[]> {
    let datas = await this.getData();

    let existeds = await this.all();
    let ids = existeds.map((x) => x.Id);

    datas = datas.filter((x) => !ids.includes(x.Id));

    if (opts.name) {
      datas = datas.filter((x) => {
        return x.Name.toLocaleLowerCase().includes(
          opts.name!.toLocaleLowerCase()
        );
      });
    }

    if (opts.host) {
      datas = datas.filter((x) => {
        return x.IPAddress.toLocaleLowerCase().includes(
          opts.host!.toLocaleLowerCase()
        );
      });
    }

    let model = datas.map((x) => this.converter.item.Convert(x));
    return model;
  }
  getData(): Promise<SubtitlingChannel[]> {
    return this.service.server.channel.supported();
  }

  private async all() {
    let servers = await this.service.server.array();
    let all = servers.map((x) => this.service.server.channel.array(x.Id));

    return Promise.all(all).then((x) => {
      return x.flat();
    });
  }
}
