import { Transform, Type } from 'class-transformer';
import 'reflect-metadata';
import { GenderType } from '../enums/gender-type.enum';
import { FaceSetItem } from './face-set-item.model';
import { IModel } from './model.interface';
import { transformDate, transformDateTime } from './transform.model';

export class Employee implements IModel {
  /**	String	唯一标识符	M	*/
  Id!: string;
  /**	String	姓名	M	*/
  Name!: string;
  /**	String	照片	M	*/
  PictureId!: string;
  /**	Int32	性别，1-男，2-女	O	*/
  Gender?: GenderType = GenderType.man;
  /**	Date	出生日期	O	*/
  @Transform(transformDate)
  BirthDate?: Date = new Date(2000, 0, 1);
  /**	String	证件号	O	*/
  IDNumber?: string;
  /**	String	联系方式	O	*/
  Contact?: string;
  /**	String	职位	O	*/
  JobTitle?: string;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	String	营业厅ID	O	*/
  HallId?: string;
  /**	FaceSetItem[]	对应设备的人脸库信息（同步和自动关联）	O	*/
  @Type(() => FaceSetItem)
  FaceSetItems?: FaceSetItem[];
}
