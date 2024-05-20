import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class VideoKeywordTableOptions {
  constructor() {
    let duration = DateTimeTool.allDay(new Date());
    this.begin = duration.begin;
    this.end = duration.end;
  }
  begin: Date;
  end: Date;
  key: string = '';
  channels: string[] = [];
}

export class SubtitlingItemModel extends SubtitlingItem {
  Position!: Date;
}
