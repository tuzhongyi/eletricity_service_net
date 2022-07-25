import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 热力点 */
export class HeatMapPoint  implements IModel{
  /**	String	区域ID	O */
  ZoneId?: string;
  /**	String	区域名称	O */
  ZoneName?: string;
  /**	Double	X位置	M */
  PositionX!: number;
  /**	Double	Y位置	M */
  PositionY!: number;
  /**	Int32	数值	M */
  Value!: number;
  /**	DateTime	时间	O */
  @Transform(transformDateTime)
  Time?: Date;
}
