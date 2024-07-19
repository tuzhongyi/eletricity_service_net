import { Duration } from 'src/app/models/duration.model';
import { SubtitlingItem } from 'src/app/models/subtitling/subtitling-item.model';

export interface HowellVideoPlayerArgs {
  cameraId: string;
}
export class HowellPreviewArgs implements HowellVideoPlayerArgs {
  cameraId!: string;
}
export class HowellPlaybackArgs implements HowellVideoPlayerArgs {
  cameraId!: string;
  duration?: Duration;
  time?: Date;
  track: boolean = false;
}
export class HowellSubtitlingArgs {
  selected?: SubtitlingItem;
  datas: SubtitlingItem[] = [];
}
