import { Transform } from 'class-transformer';
import { IIdModel } from './model.interface';
import { transformDateTime } from './transform.model';

/**	Stranger (陌生人)	*/
export class Stranger implements IIdModel {
  /**	String	ID	M	*/
  Id!: string;
  /**	String	名称（不要使用，为空）	O	*/
  Name?: string;
  /**	String	年龄段（不要使用，为空）	O	*/
  AgeGroup?: string;
  /**	String	性别（不要使用，为空）Male，Female	O	*/
  Gender?: string;
  /**
   * String[]
   * 人脸库中的唯一ID
   * 注意：人脸库中可能会出现一个人的多个状态的人脸，此处用于合并人脸库中的错误重复ID。
   * O
   **/
  FaceIds?: string[];
  /**	Int32	出现过的历史次数	M	*/
  Occurrences!: number;
  /**	String	人脸图片地址	O	*/
  FacePictureUrl?: string;
  /**	Boolean	是否启用，默认：true，屏蔽：false	M	*/
  Enabled!: boolean;
  /**	String	扩展的描述信息	O	*/
  Description?: string;
  /**	Int32	分类（不要使用）	O	*/
  Classification?: number;
  /**	DateTime	创建时间	M	*/
  @Transform(transformDateTime)
  CreationTime!: Date;
  /**	DateTime	更新时间	M	*/
  @Transform(transformDateTime)
  UpdateTime!: Date;
  /**	String	营业厅ID	M	*/
  HallId!: string;
  /**	String	设备唯一标识符	M	*/
  DeviceId!: string;
}
