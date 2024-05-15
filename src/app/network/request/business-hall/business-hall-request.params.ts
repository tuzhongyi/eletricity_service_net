import { Transform } from 'class-transformer';
import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { TimeUnit } from 'src/app/enums/time-unit.enum';
import { ZoneType } from 'src/app/enums/zone-type.enum';
import { transformDateTime } from 'src/app/models/transform.model';
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

/**	GetStrangerParams	*/
export class GetStrangerParams extends PagedParams {
  /**	Int32	最小出现频次	O	*/
  Occurrences?: number;
  /**	String	性别（不要使用），Male，Female	O	*/
  Gender?: string;
  /**	String	年龄段（不要使用）	O	*/
  AgeGroup?: string;
  /**	String[]	陌生人ID列表	O	*/
  Ids?: string[];
  /**	String[]	人脸唯一ID列表	O	*/
  FaceIds?: string[];
  /**	DateTime	过滤创建时间的开始时间	O	*/
  @Transform(transformDateTime)
  BeginTime?: Date;
  /**	DateTime	过滤创建时间的结束时间	O	*/
  @Transform(transformDateTime)
  EndTime?: Date;
  /**	Boolean	是否启用，默认：true，屏蔽：false	O	*/
  Enabled?: boolean;
  /**	String	升序字段	O	*/
  Asc?: string;
  /**	String	降序字段	O	*/
  Desc?: string;
}
/**	MergeStrangerParams	*/
export class MergeStrangerParams implements IParams {
  /**	String[]	需要合并的陌生人ID	M	*/
  MergeIds!: string[];
  /**	String	合并后的目标陌生人ID	M	*/
  StrangerId!: string;
}

/**	GetStrangerRecordsParams	*/
export class GetStrangerRecordsParams extends PagedDurationParams {
  /**	String	陌生人ID，必须指定某个陌生人。	M	*/
  StrangerId!: string;
  /**	String[]	抓拍到的摄像机ID列表	O	*/
  CameraIds?: string[];
  /**	Double	相似度大于，[0,1]	O	*/
  Similarity?: number;
  /**	String	升序字段	O	*/
  Asc?: string;
  /**	String	降序字段	O	*/
  Desc?: string;
}
