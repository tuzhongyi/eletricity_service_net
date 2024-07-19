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
