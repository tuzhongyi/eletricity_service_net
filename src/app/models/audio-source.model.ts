import { Transform } from 'class-transformer';
import { AudioSourceType } from '../enums/audio-source-type.enum';
import { IdNameModel } from './model.interface';
import { transformDateTime } from './transform.model';

export class AudioSource implements IdNameModel {
  /**	String	ID	M	*/
  Id!: string;
  /**	String	名称	M	*/
  Name!: string;
  /**	Int32	"数据来源类型，
1- Camera，摄像机音频
2- SoundHead，拾音头"	M	*/
  SourceType!: AudioSourceType;
  /**	String	数据来源地址	O	*/
  Urls?: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	Int32[]	报警情绪	O	*/
  Emotions?: number[];
  /**	Double	报警分贝阈值[0-100]	O	*/
  VolumeThreshold?: number;
  /**	String[]	关键字报警	O	*/
  Keywords?: string[];
  /**	Boolean	默认是否报警，默认：false不报警	O	*/
  DefaultIsAlarm?: boolean;
  /**	String	描述信息	O	*/
  Description?: string;
  /**	DateTime	创建时间	O	*/
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O	*/
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	String	所属分析服务器ID	O	*/
  AnalysisServerId?: string;
}
