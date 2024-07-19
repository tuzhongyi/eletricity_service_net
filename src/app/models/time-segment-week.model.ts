import { Type } from 'class-transformer';
import { IModel } from './model.interface';
import { DayTimeSegment } from './time-segment-day.model';

export class WeekTimeSegment implements IModel {
  /**	DayTimeSegment[]	7天的日工作时间段	M	RW */
  @Type(() => DayTimeSegment)
  Days!: DayTimeSegment[];
}
