import { PlayMode } from '../../enums/play-mode.enum';
import { IConverter } from '../../interfaces/converter.interface';
import { Camera } from '../../models/camera.model';
import { EventRecord } from '../../models/event-record.model';
import { VideoArgs } from '../../models/args/video.args';

export class VideoArgsConverter
  implements IConverter<Camera | EventRecord, VideoArgs>
{
  static Convert(source: Camera | EventRecord, ...res: any[]): VideoArgs {
    let converter = new VideoArgsConverter();
    return converter.Convert(source);
  }

  Convert(source: Camera | EventRecord, ...res: any[]): VideoArgs {
    if (source instanceof Camera) {
      return this.camera(source);
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
    args.time = source.EventTime;
    args.title = source.ResourceName ?? '';
    return args;
  }

  camera(source: Camera) {
    let args = new VideoArgs();
    args.data = source;
    args.cameraId = source.Id;
    args.title = source.Name;
    args.autoplay = false;
    return args;
  }
}
