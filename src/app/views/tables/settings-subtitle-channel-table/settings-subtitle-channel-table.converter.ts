import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { SubtitlingChannelModel } from './settings-subtitle-channel-table.model';

@Injectable()
export class SettingsSubtitleChannelTableConverter
  implements
    IConverter<PagedList<SubtitlingChannel>, PagedList<SubtitlingChannelModel>>
{
  constructor(private service: SubtitlingRequestService) {}
  Convert(
    source: PagedList<SubtitlingChannel>,
    ...res: any[]
  ): PagedList<SubtitlingChannelModel> {
    let paged = new PagedList<SubtitlingChannelModel>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
  item = new SettingsSubtitleChannelTableItemConverter(this.service);
}

export class SettingsSubtitleChannelTableItemConverter
  implements IConverter<SubtitlingChannel, SubtitlingChannelModel>
{
  constructor(private service: SubtitlingRequestService) {}

  Convert(source: SubtitlingChannel, ...res: any[]): SubtitlingChannelModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(SubtitlingChannelModel, plain);

    model.Server = this.service.server.get(model.ServerId);

    return model;
  }
}
