import { IdModel } from './model.interface';

export class AnalysisServer implements IdModel {
  /**	String	ID	M	*/
  Id!: string;
  /**	String	名称	O	*/
  Name?: string;
  /**	String	Url地址	M	*/
  Url!: string;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String	协议类型：Howell	M	*/
  ProtocolType!: string;
  /**	Int32	数据刷新间隔，单位：ms，默认300秒。	M	*/
  Interval!: number;
  /**	Int32	状态，0-正常，1-离线	O	*/
  Status?: number;
}
