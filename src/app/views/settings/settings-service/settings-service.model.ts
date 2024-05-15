import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class SettingsServiceWindow {
  confirm = new ConfirmWindow();
  subtitle = new SubtitleServerWindow();
}

class ConfirmWindow extends WindowViewModel {
  style = {
    width: '24%',
    height: '28%',
  };
  title = '提示';
  message = '';
  type!: SettingServiceType;
}

class SubtitleServerWindow extends WindowViewModel {
  style = {
    width: '600px',
    height: '620px',
  };
  title = '字幕服务器';
}

export enum SettingServiceType {
  sr_server,
  passenger_server,
  center_id,
  analysis_server,
}
