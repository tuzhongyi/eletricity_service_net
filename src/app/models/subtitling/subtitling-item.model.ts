import { Transform } from 'class-transformer';
import { IModel } from '../model.interface';
import { transformDateTime } from '../transform.model';

/**	SubtitlingItem (字幕子项)	*/
export class SubtitlingItem implements IModel {
  /**	String	通道ID	M	*/
  ChannelId!: string;
  /**	String	通道名称	O	*/
  ChannelName?: string;
  /**	DateTime	开始时间	M	*/
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M	*/
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	String	字幕内容，多行中间用\r\n分割	M	*/
  Subtitles!: string;
}
