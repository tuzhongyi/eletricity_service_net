import { transformDateTime } from './transform.model';
import { Transform } from 'class-transformer';
import { HeatMapPoint } from './heat-map-point.model';
import { IModel } from './model.interface';
/** 热力图 */
export class HeatMap implements IModel {
  /**	String	唯一ID	M */
  Id!: string;
  /**	String	营业厅ID	M */
  HallId!: string;
  /**	String	营业厅名称	O */
  HallName?: string;
  /**	String	楼层ID	O */
  FloorId?: string;
  /**	String	楼层名称	O */
  FloorName?: string;
  /**	String	摄像机ID	O */
  CameraId?: string;
  /**	String	摄像机名称	O */
  CameraName?: string;
  /**	String	图片地址	M */
  ImageUrl!: string;
  /**	DateTime	开始时间	M */
  @Transform(transformDateTime)
  BeginTime!: Date;
  /**	DateTime	结束时间	M */
  @Transform(transformDateTime)
  EndTime!: Date;
  /**	HeatMapPoint[]	热力图点位信息	O */
  Points?: HeatMapPoint[];
}
