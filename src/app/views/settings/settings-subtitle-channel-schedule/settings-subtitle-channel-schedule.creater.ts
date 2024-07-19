import { TimeModel } from 'src/app/components/time-control/time-control.model';
import {
  DayTimeSegmentModel,
  TimeSegmentModel,
  WeekTimeSegmentModel,
} from './settings-subtitle-channel-schedule.model';

export class SettingsSubtitleChannelScheduleCreater {
  static Segment() {
    let model = new TimeSegmentModel();
    model.StartTime = new TimeModel(8, 0, 0);
    model.StopTime = new TimeModel(17, 0, 0);
    return model;
  }

  static WeekTimeSegmentModel() {
    let model = new WeekTimeSegmentModel();
    model.Days = [];
    for (let i = 0; i < 7; i++) {
      model.Days.push(this.DayTimeSegmentModel(i));
    }
    return model;
  }

  static DayTimeSegmentModel(week: number) {
    let model = new DayTimeSegmentModel();
    model.DayOfWeek = week;
    model.Segments = [this.Segment()];
    return model;
  }
}
