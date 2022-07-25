/** 周工作表 */

import { DailySchedule } from './daily-schedule.model';

export class WeeklySchedule {
  /**	DailySchedule[]	每日工作时间段，数组下标0-周日，6-周六	M */
  Days!: DailySchedule[];
}
