import { IdNameModel } from '../model.interface';

/**	Channel (字幕生成通道)	*/
export class SubtitlingChannel implements IdNameModel {
  /**	String	通道ID	M	*/
  Id!: string;
  /**	String	通道名称	M	*/
  Name!: string;
  /**	String	设备IP地址	M	*/
  IPAddress!: string;
  /**	String	端口号	M	*/
  Port!: string;
  /**	Int32	通道编号，从1开始	M	*/
  ChannelNo!: number;
  /**	String	协议类型，Howell8000	O	*/
  ProtocolType?: string;
  /**	String	音频格式，G.711A	O	*/
  AudioFormat?: string;
  /**	String	流转服务器摄像机ID	O	*/
  SRCameraId?: string;
  /**	String	流转服务ID	O	*/
  SRServerId?: string;
  /**	String	中心业务ID	O	*/
  CenterId?: string;
  /**	String	字幕服务器业务ID	O	*/
  AudioSourceId?: string;
  /**	String	字幕服务器ID	M	*/
  ServerId!: string;
  /**	Boolean	是否启用，True：启用	M	*/
  Enabled!: boolean;
}
