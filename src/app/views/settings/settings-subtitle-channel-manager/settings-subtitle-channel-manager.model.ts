import { EventEmitter } from '@angular/core';
import { WindowViewModel } from 'src/app/components/window-control/window.model';
import { Polygon } from 'src/app/models/polygon.model';
import { SubtitlingChannel } from 'src/app/models/subtitling/subtitling-channel.model';

export class SettingsSubtitleChannelManagerWindow {
  supported = new SupportedWindow();
  confirm = new ConfirmWindow();
  schedule = new scheduleWindow();
  picture = new PictureWindow();
}

class SupportedWindow extends WindowViewModel {
  style = {
    width: '70%',
    height: '75%',
    transform: 'translate(-50%, -45%)',
  };
  title = '快速添加';
}

class ConfirmWindow extends WindowViewModel {
  style = {
    width: '24%',
    height: '28%',
  };
  title = '提示';
  message = '';
  yes!: Promise<void>;
}

class scheduleWindow extends WindowViewModel {
  style = {
    width: '600px',
    height: '590px',
  };
  title = '工作表';

  channel?: SubtitlingChannel;
}
class PictureWindow extends WindowViewModel {
  constructor() {
    super();
  }

  url: string = '';
  polygon?: Polygon;
  isError: boolean = false;
  clear = new EventEmitter();
  title: string = '';
  style = {
    width: '80%',
    height: 'calc(80% + 40px)',
  };
}
