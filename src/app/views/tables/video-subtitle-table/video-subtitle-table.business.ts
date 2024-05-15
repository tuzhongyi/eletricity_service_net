import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { GetKeywordSubtitlingParams } from 'src/app/network/request/subtitling/subtitling-request.params';
import { SubtitlingRequestService } from 'src/app/network/request/subtitling/subtitling-request.service';
import { VideoSubtitleTableArgs } from './video-subtitle-table.model';

@Injectable()
export class VideoSubtitleTableBusiness
  implements IBusiness<PagedList<SubtitlingItem>>
{
  constructor(private service: SubtitlingRequestService) {}

  load(
    index: number,
    size: number,
    args: VideoSubtitleTableArgs
  ): Promise<PagedList<SubtitlingItem>> {
    let data = this.getData(index, size, args);
    return data;
  }
  getData(
    index: number,
    size: number,
    args: VideoSubtitleTableArgs
  ): Promise<PagedList<SubtitlingItem>> {
    let params = new GetKeywordSubtitlingParams();
    params.PageIndex = index;
    params.PageSize = size;
    params.BeginTime = args.duration.begin;
    params.EndTime = args.duration.end;
    if (args.key) {
      params.Keywords = [args.key];
    }

    return this.service.keywords(params);
  }
}
