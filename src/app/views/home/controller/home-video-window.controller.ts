import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PlayMode } from 'src/app/enums/play-mode.enum';

export class HomeVideoWindow extends WindowViewModel {
  constructor() {
    super();
  }

  cameraId?: string;
  mode: PlayMode = PlayMode.live;

  title: string = '';

  autoplay: boolean = false;
  begin?: Date;
  end?: Date;
  subtitle = false;
  style = {
    height: '80%',
    width: 'auto',
    aspectRatio: '16 / 10.2',
  };
}
