import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { WindowViewModel } from 'src/app/components/window-control/window.model';

export class SettingsSubtitleChannelScheduleArgs {
  serverId!: string;
  channelId!: string;
}

export class TimeSegmentModel {
  StartTime!: TimeModel;
  StopTime!: TimeModel;
}

export class DayTimeSegmentModel {
  DayOfWeek!: number;
  Segments!: TimeSegmentModel[];
}

export class WeekTimeSegmentModel {
  Days!: DayTimeSegmentModel[];
}

export class SettingsSubtitleChannelScheduleWindow {
  copy = new CopyWindow();
}

class CopyWindow extends WindowViewModel {
  style = {
    width: '380px',
    height: '268px',
  };
  title = '复制到……';
  day?: DayTimeSegmentModel;
}
