import { StreamType } from 'src/app/enums/stream-type.enum';
import { Duration } from 'src/app/models/duration.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';

export interface HowellVideoPlayerArgs {
  cameraId: string;
  stream: StreamType;
}
export class HowellPreviewArgs implements HowellVideoPlayerArgs {
  stream: StreamType = StreamType.main;
  cameraId!: string;
}
export class HowellPlaybackArgs implements HowellVideoPlayerArgs {
  stream: StreamType = StreamType.main;
  cameraId!: string;
  duration?: Duration;
  time?: Date;
  track: boolean = false;
}
export class HowellSubtitlingArgs {
  selected?: SubtitlingItem;
  datas: SubtitlingItem[] = [];
}
