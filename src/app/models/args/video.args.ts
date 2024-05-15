import { PlayMode } from '../../enums/play-mode.enum';

export class VideoArgs<T = any> {
  cameraId: string = '';
  title: string = '';
  mode: PlayMode = PlayMode.live;
  autoplay: boolean = false;
  subtitle = false;
  begin?: Date;
  end?: Date;

  data?: T;
}
