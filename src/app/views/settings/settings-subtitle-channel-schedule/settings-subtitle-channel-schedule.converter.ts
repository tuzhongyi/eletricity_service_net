import { TimeModel } from 'src/app/components/time-control/time-control.model';
import { DayTimeSegment } from 'src/app/models/time-segment-day.model';
import { WeekTimeSegment } from 'src/app/models/time-segment-week.model';
import { TimeSegment } from 'src/app/models/time-segment.model';
import { Time } from 'src/app/models/time.model';
import { SettingsSubtitleChannelScheduleCreater as Creater } from './settings-subtitle-channel-schedule.creater';
import {
  DayTimeSegmentModel,
  TimeSegmentModel,
  WeekTimeSegmentModel,
} from './settings-subtitle-channel-schedule.model';

export class SettingsSubtitleChannelScheduleConverter {
  private _model = new ModelConverter();
  private _data = new DataConverter();

  data = {
    from: (input: WeekTimeSegmentModel) => {
      return this._data.WeekTimeSegment(input);
    },
    to: (input: WeekTimeSegment) => {
      return this._model.WeekTimeSegment(input);
    },
  };
  model = {
    from: (input: WeekTimeSegment) => {
      return this._model.WeekTimeSegment(input);
    },
    to: (input: WeekTimeSegmentModel) => {
      return this._data.WeekTimeSegment(input);
    },
  };
}

class DataConverter {
  Time(input: TimeModel) {
    let model = new Time(input.hour, input.minute, input.second);
    return model;
  }

  TimeSegment(input: TimeSegmentModel) {
    let model = new TimeSegment();
    model.StartTime = this.Time(input.StartTime);
    model.StopTime = this.Time(input.StopTime);
    return model;
  }

  DayTimeSegment(input: DayTimeSegmentModel) {
    let model = new DayTimeSegment();
    model.DayOfWeek = input.DayOfWeek;
    model.Segments = input.Segments.map((item) => this.TimeSegment(item));
    return model;
  }
  WeekTimeSegment(input: WeekTimeSegmentModel) {
    let model = new WeekTimeSegment();
    model.Days = input.Days.map((item) => this.DayTimeSegment(item));
    return model;
  }
}

class ModelConverter {
  Time(input: Time) {
    let model = new TimeModel(input.hour, input.minute, input.second);
    return model;
  }

  TimeSegment(input: TimeSegment): TimeSegmentModel {
    let model = new TimeSegmentModel();
    model.StartTime = this.Time(input.StartTime);
    model.StopTime = this.Time(input.StopTime);
    return model;
  }

  DayTimeSegment(input: DayTimeSegment) {
    let model = new DayTimeSegmentModel();
    model.DayOfWeek = input.DayOfWeek;
    if (input.Segments && input.Segments.length > 0) {
      model.Segments = input.Segments.map((item) => this.TimeSegment(item));
    } else {
      model.Segments = [Creater.Segment()];
    }
    return model;
  }
  WeekTimeSegment(input: WeekTimeSegment) {
    let model = new WeekTimeSegmentModel();
    model.Days = input.Days.map((item) => this.DayTimeSegment(item));
    return model;
  }
}
