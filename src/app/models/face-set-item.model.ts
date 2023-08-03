import { IModel } from './model.interface';

export class FaceSetItem implements IModel {
  /**	String	流转服务器ID	M	*/ SRServerId!: string;
  /**	String	设备唯一标识符	M	*/ DeviceId!: string;
  /**	String	人脸库ID	M	*/ FaceSetId!: string;
  /**	String	人脸库名称	M	*/ FaceSetName!: string;
  /**	String	人员ID	M	*/ ItemId!: string;
  /**	String	人员名称	M	*/ ItemName!: string;
}
