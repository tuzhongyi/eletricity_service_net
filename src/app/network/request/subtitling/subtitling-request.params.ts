import {
  DurationParams,
  PagedDurationParams,
  PagedParams,
} from '../IParams.interface';

export class GetSubtitlingChannelsParams extends PagedParams {
  /**	String[]	通道ID	O */
  Ids?: string[];
  /**	String	通道名称，支持LIKE	O */
  Name?: string;
  /**	String	音频格式	O */
  AudioFormat?: string;
  /**	String[]	流转服务器摄像机ID	O */
  SRCameraIds?: string[];
  /**	String[]	流转服务ID	O */
  SRServerIds?: string[];
  /**	String[]	中心业务ID	O */
  CenterIds?: string[];
  /**	String[]	字幕服务器业务ID	O */
  AudioSourceIds?: string[];
  /**	String[]	字幕服务器ID	O */
  ServerIds?: string[];
  /**	Boolean	是否启用	O */
  Enabled?: boolean;
}
export class GetSubtitlingSrtParams extends DurationParams {
  /**	String	通道ID	O */
  ChannelId?: string;
  /**	String	通道名称，支持LIKE	O */
  ChannelName?: string;
  /**	String	流转服务器摄像机ID	O */
  SRCameraId?: string;
  /**	String	流转服务ID	O */
  SRServerId?: string;
  /**	String	中心业务ID	O */
  CenterId?: string;
  /**	String	字幕服务器业务ID	O */
  AudioSourceId?: string;
}
export class GetKeywordSubtitlingParams extends PagedDurationParams {
  /**	String[]	通道ID列表	O */
  ChannelIds?: string[];
  /**	String[]	关键字列表，LIKE	O */
  Keywords?: string[];
}
