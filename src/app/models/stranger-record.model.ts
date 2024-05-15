import { Transform, Type } from 'class-transformer';
import { FaceSetMatchResult } from './face-set-match-result.model';
import { IIdModel } from './model.interface';
import { transformBase64, transformDateTime } from './transform.model';

/**	StrangerRecord (陌生人出现记录)	*/
export class StrangerRecord implements IIdModel {
  /**	String	记录ID	M	*/
  Id!: string;
  /**	String	陌生人ID，数据库中无陌生人ID，一般都是后处理的。	O	*/
  StrangerId?: string;
  /**	DateTime	出现时间、事件发生时间	M	*/
  @Transform(transformDateTime)
  Time!: Date;
  /**	String	营业厅ID	O	*/
  HallId?: string;
  /**	String	抓拍到的摄像机ID	O	*/
  CameraId?: string;
  /**	String	摄像机名称	O	*/
  CameraName?: string;
  /**	String	抓拍的人脸照片ID	O	*/
  @Transform(transformBase64)
  FacePictureUrl?: string;
  /**	String	背景照片ID	O	*/
  @Transform(transformBase64)
  BackgroundUrl?: string;
  /**	FaceSetMatchResult	人脸比对结果	O	*/
  @Type(() => FaceSetMatchResult)
  FaceSetMatch?: FaceSetMatchResult;
  /**	Int32	事件类型保留，默认：0	M	*/
  RecordType!: number;
  /**	String	扩展的描述信息	O	*/
  Description?: string;
  /**	DateTime	创建时间，本地数据的创建时间和事件发生无关	M	*/
  @Transform(transformDateTime)
  CreationTime!: Date;
}
