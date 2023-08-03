import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

export class EmployeeTrackRecord implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	DateTime	事件时间	M	*/
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型（无效），填0	M	*/
  EventType!: number;
  /**	String	事件描述信息	O	*/
  EventDescription?: string;
  /**	String	资源ID	O	*/
  ResourceId?: string;
  /**	String	资源类型：Camera：监控点	O	*/
  ResourceType?: string;
  /**	String	资源名称	O	*/
  ResourceName?: string;
  /**	String	图片ID、图片地址	O	*/
  ImageUrl?: string;
  /**	String	录像文件ID、录像地址	O	*/
  RecordUrl?: string;
  /**	String	事件关键字	O	*/
  EventIndexes?: string;
  /**	String	营业厅ID	O	*/
  HallId?: string;
  /**	String	营业厅名称	O	*/
  HallName?: string;
  /**	String	楼层ID	O	*/
  FloorId?: string;
  /**	String	楼层名称	O	*/
  FloorName?: string;
  /**	String	区域ID	O	*/
  ZoneId?: string;
  /**	String	区域名称	O	*/
  ZoneName?: string;
  /**	String	中心服务器上的唯一ID	O	*/
  CenterId?: string;
  /**	String	员工ID	O	*/
  EmployeeId?: string;
  /**	String	姓名	O	*/
  EmployeeName?: string;
  /**	String	证件号	O	*/
  EmployeeIDNumber?: string;
  /**	Int32	置信度，0-100	O	*/
  Confidence?: number;
}
