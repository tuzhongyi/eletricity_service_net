import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';

/** 客流信息 */

export class PassengerFlow implements IModel {
  /**	String	记录ID	M */
  Id!: string;
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	Int64	小时yyyyMMddHHmm	O */
  Minute?: number;
  /**	Int64	小时yyyyMMddHH	O */
  Hour?: number;
  /**	Int64	日期 yyyyMMdd	O */
  Date?: number;
  /**	String	营业厅ID	M */
  HallId!: string;
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	Int32	进入客流数量	M */
  InNum!: number;
  /**	Int32	离开客流数量	M */
  OutNum!: number;
  /**	Int32	滞留客流数量	O */
  RetentionNum?: number;
  /**	Int32	顾客数量	O */
  CustomerNum?: number;
  /**	Int32	顾客组数量	O */
  CustomerGroupNum?: number;
}
