import { IdNameModel } from '../model.interface';

/**	Server (字幕服务器)	*/
export class SubtitlingServer implements IdNameModel {
  /**	String	服务器ID	M	*/
  Id!: string;
  /**	String	服务器名称	M	*/
  Name!: string;
  /**	String	主机地址，192.168.22.1	M	*/
  Host!: string;
  /**	Int32	端口号，7000	M	*/
  Port!: number;
  /**	Int32	最大分析路数，默认：4路	O	*/
  MaxChannelCount?: number;
  /**	String	用户名	O	*/
  Username?: string;
  /**	String	密码	O	*/
  Password?: string;
  /**	String	描述信息	O	*/
  Description?: string;
}
