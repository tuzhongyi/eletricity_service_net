import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { PlayMode } from 'src/app/enums/play-mode.enum';

@Injectable()
export class VideoWindow {
  video = new ToVideoWindow();
}

class ToVideoWindow extends WindowViewModel {
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
    width: '80%',
    height: 'calc(80% + 40px)',
  };
}
