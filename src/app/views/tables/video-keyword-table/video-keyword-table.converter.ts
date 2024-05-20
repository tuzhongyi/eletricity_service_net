import { instanceToPlain, plainToInstance } from 'class-transformer';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';
import { SubtitlingItemModel } from './video-keyword-table.model';

export class VideoKeywordTableItemConverter {
  convert(
    source: SubtitlingItem,
    begin: Date,
    offset: number
  ): SubtitlingItemModel {
    let plain = instanceToPlain(source);
    let model = plainToInstance(SubtitlingItemModel, plain);
    model.Position = this.time2position(source.BeginTime, begin, offset);

    return model;
  }

  time2position(time: Date, begin: Date, offset: number) {
    return new Date(
      time.getTime() -
        begin.getTime() +
        time.getTimezoneOffset() * 1000 * 60 +
        offset
    );
  }

  position2time(position: Date) {
    return new Date(
      position.getTime() - position.getTimezoneOffset() * 1000 * 60
    );
  }
}
