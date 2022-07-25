import { transformDateTime } from './transform.model';
import { GisPoint } from './gis-point.model';
import { WeeklySchedule } from './weekly-schedule.model';
import { Transform } from 'class-transformer';
import { IModel } from './model.interface';

/** 营业厅 */
export class BusinessHall implements IModel {
  /**	String	营业厅ID	M */
  Id!: string;
  /**	String	营业厅名称	M */
  Name!: string;
  /**	String	所属区县街道	O */
  Division?: string;
  /**	String	地址	O */
  Address?: string;
  /**	String	营业时间文字描述	O */
  BusinessHours?: string;
  /**	WeeklySchedule	营业时间	O */
  Schedule?: WeeklySchedule;
  /**	String	负责人	O */
  Principal?: string;
  /**	String	描述信息	O */
  Description?: string;
  /**	DateTime	创建时间	O */
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O */
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	GisPoint	区划中心GIS点位	O */
  GisPoint?: GisPoint;
  /**	String	客流服务器ID	O */
  PassengerServerId?: string;
  /**	String	客流服务器上的营业厅ID	O */
  PassengerServerUnid?: string;
  /**	String	中心服务器上的唯一ID	O */
  CenterId?: string;
}
