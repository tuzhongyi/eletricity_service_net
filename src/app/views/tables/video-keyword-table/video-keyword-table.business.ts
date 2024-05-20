import { Injectable } from '@angular/core';

import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { ConfigRequestService } from 'src/app/network/request/config/config.service';
import { GetKeywordSubtitlingParams } from 'src/app/network/request/subtitling/subtitling-request.params';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { VideoKeywordTableItemConverter } from './video-keyword-table.converter';
import {
  SubtitlingItemModel,
  VideoKeywordTableOptions,
} from './video-keyword-table.model';

@Injectable()
export class VideoKeywordTableBusiness
  implements IBusiness<SubtitlingItem[], SubtitlingItemModel[]>
{
  constructor(
    private service: SubtitlingRequestService,
    private config: ConfigRequestService
  ) {}
  converter = new VideoKeywordTableItemConverter();
  async load(opts: VideoKeywordTableOptions): Promise<SubtitlingItemModel[]> {
    let datas = await this.getData(opts);
    if (datas.length == 0) {
      return [];
    }
    let config = await this.config.get();
    let model = datas.map((x) =>
      this.convert(x, datas[0].BeginTime, config.playback.begin)
    );
    return model;
  }
  async getData(opts: VideoKeywordTableOptions): Promise<SubtitlingItem[]> {
    let params = new GetKeywordSubtitlingParams();

    params.BeginTime = opts.begin;
    params.EndTime = opts.end;
    if (opts.key) {
      params.Keywords = [opts.key];
    }
    if (opts.channels && opts.channels.length > 0) {
      params.ChannelIds = opts.channels;
    }
    return this.all(params);
  }

  async all(params: GetKeywordSubtitlingParams) {
    let data: SubtitlingItem[] = [];
    let index = 1;
    let paged: PagedList<SubtitlingItem>;
    do {
      params.PageIndex = index;
      paged = await this.service.keywords(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  convert(item: SubtitlingItem, begin: Date, offset: number) {
    return this.converter.convert(item, begin, -offset * 1000);
  }
}
