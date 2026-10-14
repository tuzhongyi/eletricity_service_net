import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class SettingsServiceWindow {
  confirm = new ConfirmWindow();
  subtitle = new SubtitleServerWindow();
  sr = {
    manager: new SRServerWindow(),
    address: new SRServerAddressWindow(),
  };
  passenger = new PassengerServerWindow();
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
class SRServerWindow extends WindowViewModel {
  style = {
    width: '800px',
    height: '580px',
  };
  title = '流转服务器';
}
class SRServerAddressWindow extends WindowViewModel {
  style = {
    width: '600px',
    height: '554px',
  };
  title = '流转服务器地址';
}
class PassengerServerWindow extends WindowViewModel {
  style = {
    width: '600px',
    height: '650px',
  };
  title = '客流服务器';
}

export enum SettingServiceType {
  sr_server,
  passenger_server,
  center_id,
  analysis_server,
}
