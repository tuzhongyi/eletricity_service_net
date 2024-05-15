import { Injectable } from '@angular/core';

import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { GetKeywordSubtitlingParams } from 'src/app/network/request/subtitling/subtitling-request.params';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { VideoKeywordTableItemConverter } from './video-keyword-table.converter';
import { VideoKeywordTableOptions } from './video-keyword-table.model';

@Injectable()
export class VideoKeywordTableBusiness
  implements IBusiness<PagedList<SubtitlingItem>>
{
  constructor(private service: SubtitlingRequestService) {}

  private converter = new VideoKeywordTableItemConverter();

  async load(
    opts: VideoKeywordTableOptions
  ): Promise<PagedList<SubtitlingItem>> {
    let data = await this.getData(opts);
    return data;
  }
  async getData(
    opts: VideoKeywordTableOptions
  ): Promise<PagedList<SubtitlingItem>> {
    let params = new GetKeywordSubtitlingParams();
    params.PageIndex = opts.pageIndex;
    params.PageSize = opts.pageSize;
    params.BeginTime = opts.begin;
    params.EndTime = opts.end;
    if (opts.key) {
      params.Keywords = [opts.key];
    }
    if (opts.channels && opts.channels.length > 0) {
      params.ChannelIds = opts.channels;
    }
    return this.service.keywords(params);
  }

  convert(item: SubtitlingItem) {
    return this.converter.Convert(item);
  }
}
