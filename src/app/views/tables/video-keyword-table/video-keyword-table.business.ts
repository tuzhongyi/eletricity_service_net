import { Injectable } from '@angular/core';

import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { GetKeywordSubtitlingParams } from 'src/app/network/request/subtitling/subtitling-request.params';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { VideoKeywordTableOptions } from './video-keyword-table.model';

@Injectable()
export class VideoKeywordTableBusiness
  implements IBusiness<SubtitlingItem[], SubtitlingItem[]>
{
  constructor(private service: SubtitlingRequestService) {}
  async load(opts: VideoKeywordTableOptions): Promise<SubtitlingItem[]> {
    let datas = await this.getData(opts);
    if (datas.length == 0) {
      return [];
    }

    return datas;
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
}
