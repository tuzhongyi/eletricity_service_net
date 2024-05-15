import { Duration } from 'src/app/models/duration.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';

export class VideoSubtitleTableArgs {
  key: string = '';
  duration: Duration = DateTimeTool.allDay(new Date());
}

export class VideoSubtitleTableItemModel<T = any> {
  id: string = '';
  name: string = '';
  data?: T;
}
