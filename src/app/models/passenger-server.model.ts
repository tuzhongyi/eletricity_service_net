import { DeviceStatus } from '../enums/device-status.enum';
import { ProtocolType } from '../enums/protocol-type.enum';
/** 客流服务器地址 */
export class PassengerServer {
  /**	String	ID	M */
  Id!: string;
  /**	String	名称	O */
  Name?: string;
  /**	String	Url地址	M */
  Url!: string;
  /**	String	用户名	O */
  Username?: string;
  /**	String	密码	O */
  Password?: string;
  /**	String	协议类型：Keliuyun	M */
  ProtocolType!: ProtocolType;
  /**	Int32	数据刷新间隔，单位：ms，默认300秒。	M */
  Interval: number = 300;
  /**	Int32	状态，0-正常，1-离线	O */
  Status?: DeviceStatus;
}
