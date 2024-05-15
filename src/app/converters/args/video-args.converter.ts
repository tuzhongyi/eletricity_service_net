import { Duration } from 'src/app/models/duration.model';
import { DateTimeTool } from 'src/app/tools/datetime.tool';
import { PlayMode } from '../../enums/play-mode.enum';
import { IConverter } from '../../interfaces/converter.interface';
import { VideoArgs } from '../../models/args/video.args';
import { Camera } from '../../models/camera.model';
import { EventRecord } from '../../models/event-record.model';

export class VideoArgsConverter
  implements IConverter<Camera | EventRecord, VideoArgs>
{
  static Convert(source: Camera | EventRecord, duration?: Duration): VideoArgs {
    let converter = new VideoArgsConverter();
    return converter.Convert(source, duration);
  }

  Convert(source: Camera | EventRecord, duration?: Duration): VideoArgs {
    if (source instanceof Camera) {
      return this.camera(source, duration);
    } else if (source instanceof EventRecord) {
      return this.recrod(source);
    } else {
      throw new Error('VideoArgsConverter source unknow');
    }
  }

  recrod(source: EventRecord) {
    let args = new VideoArgs();
    args.data = source;
    args.autoplay = true;
    args.cameraId = source.ResourceId ?? '';
    args.mode = PlayMode.vod;
    let duration = DateTimeTool.beforeAndAfter(source.EventTime, 30);
    args.begin = duration.begin;
    args.end = duration.end;
    args.title = source.ResourceName ?? '';
    return args;
  }

  camera(source: Camera, duration?: Duration) {
    let args = new VideoArgs();
    args.data = source;
    args.cameraId = source.Id;
    args.title = source.Name;
    args.autoplay = false;
    if (duration) {
      args.mode = PlayMode.vod;
      args.begin = duration.begin;
      args.end = duration.end;
    }
    return args;
  }
}
