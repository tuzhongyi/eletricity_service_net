import { Transform } from 'class-transformer';
import { transformDateTime } from './transform.model';
import { Polygon } from './polygon.model';
import { Position } from './position.model';
import { ZoneType } from '../enums/zone-type.enum';
import { DeviceStatus } from '../enums/device-status.enum';

/** 区域信息 */
export class Zone {
  /**	String	区域ID	M */
  Id!: string;
  /**	String	区域名称	M */
  Name!: string;
  /**	Int32	区域类型，默认：0	M */
  ZoneType: ZoneType = ZoneType.none;
  /**	Int32	区域状态	O */
  Status?: DeviceStatus;
  /**	String	所属楼层ID	M */
  FloorId!: string;
  /**	String	营业厅ID	M */
  HallId!: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	DateTime	创建时间	O */
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O */
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	Position	区域位置	O */
  Position?: Position;
  /**	Polygon	区域区域	O */
  Area?: Polygon;
  /**	Int32	区域顺序，默认不填	O */
  Order?: number;
  /**	String	客流服务器上的营业厅ID	O */
  PassengerServerUnid?: string;
}
