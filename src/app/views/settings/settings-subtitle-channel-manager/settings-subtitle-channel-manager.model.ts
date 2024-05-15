import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class SettingsSubtitleChannelManagerWindow {
  supported = new SupportedWindow();
  confirm = new ConfirmWindow();
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
