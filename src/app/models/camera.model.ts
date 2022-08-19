import { CameraUsage } from '../enums/camera-usage.enum';
import { DeviceStatus } from '../enums/device-status.enum';
import { Transform, Type } from 'class-transformer';
import { transformDateTime } from './transform.model';
import { Position } from './position.model';
import { IModel } from './model.interface';
import { Resolution } from './resolution.model';
import { CameraZone } from './camera-zone.model';
import 'reflect-metadata';

/** 摄像机 */
export class Camera implements IModel {
  /**	String	ID	M */
  Id!: string;
  /**	String	名称	M */
  Name!: string;
  /**	String	IP地址	O */
  IP?: string;
  /**	Int32	用途，1-监控，2-AI，3-客流，4-热力图	O */
  Usage?: CameraUsage;
  /**	String	所属楼层ID	O */
  FloorId?: string;
  /**	String	营业厅ID	O */
  HallId?: string;
  /**	Int32	状态，0-正常，1-离线	O */
  Status?: DeviceStatus;
  /**	String	描述信息	O */
  Description?: string;
  /**	String	流转服务器对应的相机ID	O */
  SRCameraId?: string;
  /**	String	流转服务器	O */
  SRServerId?: string;
  /**	String	中心服务器上的唯一ID	O */
  CenterId?: string;
  /**	DateTime	创建时间	O */
  @Transform(transformDateTime)
  CreateTime?: Date;
  /**	DateTime	更新事件	O */
  @Transform(transformDateTime)
  UpdateTime?: Date;
  /**	Position	平面图上的位置	O */
  Position?: Position;
  /**	String	客流服务器上的营业厅ID	O */
  PassengerServerUnid?: string;

  /** */
  ImageUrl?: string;
  /**	报警接入ID，如果没有该项，报警ID默认为SRCameraId	O */
  AlarmId?: string;
  /**	分辨率	O */
  Resolution?: Resolution;
}
