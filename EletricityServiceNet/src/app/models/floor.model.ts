import { Transform } from 'class-transformer';
import { IModel } from './model.interface';
import { transformDateTime } from './transform.model';
/** 楼层信息 */
export class Floor  implements IModel{
  /**	String	楼层ID	M */
  Id!: string;
  /**	Int32	楼层号0=Ground，1=F1，-1=B1	M */
  No!: number;
  /**	String	楼层名称	O */
  Name?: string;
  /**	Int32	楼层状态	O */
  Status?: number;
  /**	String	平面图地址	O */
  PlanUrl?: string;
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
  /**	String	客流服务器上的营业厅ID	O */
  PassengerServerUnid?: string;
}
