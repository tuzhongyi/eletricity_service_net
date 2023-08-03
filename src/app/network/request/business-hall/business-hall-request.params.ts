import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { ZoneType } from 'src/app/enums/zone-type.enum';
import {
  DurationParams,
  IParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

export class GetBusinessHallsParams extends PagedParams implements IParams {
  /**	String[]	营业厅ID	O */
  Ids?: string[];
  /**	String	营业厅名称，支持LIKE	O */
  Name?: string;
}

export class GetZonesParams extends PagedParams implements IParams {
  /**	String[]	ID	O */
  Ids?: string[];
  /**	String[]	楼层ID	O */
  FloorIds?: string[];
  /**	String[]	营业厅ID	O */
  HallIds?: string[];
  /**	String	名称，支持LIKE	O */
  Name?: string;
  /**	Int32	区域类型，默认：0	O */
  ZoneType?: ZoneType;
  /**	Int32	区域状态	O */
  Status?: DeviceStatus;
}

export class GetCamerasParams extends PagedParams implements IParams {
  /**	String[]	ID	O */
  Ids?: string[];
  /**	String[]	楼层ID	O */
  FloorIds?: string[];
  /**	String[]	营业厅ID	O */
  HallIds?: string[];
  /**	String	名称，支持LIKE	O */
  Name?: string;
  /**	Int32	用途	O */
  Usage?: CameraUsage;
  /**	Int32	状态	O */
  Status?: DeviceStatus;
}

export class GetPassengerFlowsParams
  extends PagedDurationParams
  implements IParams
{
  /**
   * 	Int32	统计时间单位：
   *  0-Minute，1-Hour，2-Day
   *  注意分钟可能是5分钟一次或者10分钟一次。	M
   */
  TimeUnit!: TimeUnit;
  /**	String[]	营业厅ID	O */
  HallIds?: string[];
}

export class GetHeatMapParams extends DurationParams implements IParams {
  /**	String	营业厅ID	M */
  HallId!: string;
}

export class GetBusinessHallStatisticsParams
  extends PagedDurationParams
  implements IParams
{
  /**	Int32	统计时间单位：0-Minute，1-Hour，2-Day 注意分钟可能是5分钟一次或者10分钟一次。	M */
  TimeUnit!: TimeUnit;
  /**	String[]	营业厅ID	O */
  HallIds?: string[];
}
export class SyncFaceSetParams implements IParams {
  /**	Boolean	删除不匹配的项，默认是：true	O */
  DeleteNotMatchItems?: boolean;
}
