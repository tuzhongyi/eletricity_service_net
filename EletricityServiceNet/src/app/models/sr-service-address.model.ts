/** 流转服务器地址 */

export class SRServerAddress {
  /**	String	IP地址	M */
  IPAddress!: string;
  /**	Int32	端口号	M */
  Port!: number;
  /**	Boolean	是否为互联网IP	M */
  IsInternet!: boolean;
  /**	Boolean	是否为直连IP地址	M */
  IsDefault!: boolean;
  /**	Int32	RTSP端口号，默认554	O */
  RtspPort?: number;
  /**	Int32	RTMP端口号，默认1935	O */
  RtmpPort?: number;
  /**	Int32	HTTP端口号，默认和服务器端口号相同	O */
  HttpPort?: number;
  /**	Int32	Websocket端口号，默认和服务器端口号相同	O */
  WsPort?: number;
}
