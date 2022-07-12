import { IModel } from './model.interface';
import { TimeRange } from './time-range.model';

/** 日工作表 */
export class DailySchedule implements IModel {
  /**	TimeRange[]	工作时间段	M */
  Times!: TimeRange[];
  /** */
}
