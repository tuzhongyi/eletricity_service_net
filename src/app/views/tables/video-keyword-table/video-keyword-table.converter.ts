import { PlayMode } from 'src/app/enums/play-mode.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { VideoArgs } from 'src/app/models/args/video.args';
import { PagedList } from 'src/app/models/page.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';

export class VideoKeywordTableConverter
  implements
    IConverter<PagedList<SubtitlingItem>, PagedList<VideoArgs<SubtitlingItem>>>
{
  Convert(
    source: PagedList<SubtitlingItem>
  ): PagedList<VideoArgs<SubtitlingItem>> {
    let paged = new PagedList<VideoArgs<SubtitlingItem>>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
  item = new VideoKeywordTableItemConverter();
}

export class VideoKeywordTableItemConverter
  implements IConverter<SubtitlingItem, VideoArgs<SubtitlingItem>>
{
  Convert(source: SubtitlingItem, ...res: any[]): VideoArgs<SubtitlingItem> {
    let args = new VideoArgs();
    args.cameraId = source.ChannelId;
    args.title = source.ChannelName ?? source.ChannelId;
    args.begin = source.BeginTime;
    args.end = source.EndTime;
    args.mode = PlayMode.vod;
    args.autoplay = true;
    args.subtitle = true;

    args.data = source;

    return args;
  }
}
