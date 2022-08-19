import { Transform } from 'class-transformer';
import { EventNumber } from './event-number.model';
import { transformDateTime } from './transform.model';
import { ZoneNumber } from './zone-number.model';

/** 当前营业厅统计信息 */
export class CurrentBusinessHallStatistic {
  /**	String	记录ID	M */
  Id!: string;
  /**	DateTime	当前时间	M */
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	营业厅ID	M */
  HallId!: string;
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	Int32	总事件数	O */
  TotalEventNumber?: number;
  /**	EventNumber[]	其他类型事件梳理	O */
  EventNumbers?: EventNumber[];
  /**	Int32	设备总数量	O */
  DeviceNumber?: number;
  /**	Int32	异常设备数量	O */
  OfflineDeviceNumber?: number;
  /**	Int32	业务总数	O */
  BusinessNumber?: number;
  /**	Double	每笔业务投递材料次数	O */
  AvgDeliveryNumber?: number;
  /**	ZoneNumber[]	区域人流数量	O */
  ZoneNumbers?: ZoneNumber[];
}
