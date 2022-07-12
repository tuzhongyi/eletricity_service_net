import { EventResourceType } from '../enums/event-resource-type.enum';
import { Transform } from 'class-transformer';
import { EventType } from '../enums/event-type.enum';
import { transformDateTime } from './transform.model';
import { IModel } from './model.interface';
/** 事件基础类型 */
export class EventRecord  implements IModel{
  /**	String	事件ID	M */
  Id!: string;
  /**	DateTime	事件时间	M */
  @Transform(transformDateTime)
  EventTime!: Date;
  /**	Int32	事件类型	M */
  EventType!: EventType;
  /**	String	事件描述信息	O */
  EventDescription?: string;
  /**	String	资源ID	O */
  ResourceId?: string;
  /**	String	资源类型	O */
  ResourceType?: EventResourceType;
  /**	String	资源名称	O */
  ResourceName?: string;
  /**	String	图片ID、图片地址	O */
  ImageUrl?: string;
  /**	String	录像文件ID、录像地址	O */
  RecordUrl?: string;
  /**	String[]	事件关键字	O */
  EventIndexes?: string[];
  /**	String	营业厅ID	O */
  HallId?: string;
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	String	楼层ID	O */
  FloorId?: string;
  /**	String	楼层名称	O */
  FloorName?: string;
  /**	String 	区域ID	O */
  ZoneId?: string;
  /**	String	区域名称	O */
  ZoneName?: string;
  /**	String	中心服务器上的唯一ID	O */
  CenterId?: string;
}
