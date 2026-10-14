import { Exclude } from 'class-transformer';
import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Camera } from 'src/app/models/camera.model';

export interface ICameraTableArgs {
  name?: string;
  usage?: CameraUsage;
  status?: DeviceStatus;
  floor?: string;
}

export class CameraTableArgs implements ICameraTableArgs {
  name?: string;
  usage?: CameraUsage;
  status?: DeviceStatus;
  floor?: string;
  first = true;
}

export class CameraModel extends Camera {
  @Exclude()
  FloorName?: Promise<string | undefined>;
  @Exclude()
  HallName?: string;
  @Exclude()
  SRServerName?: Promise<string | undefined>;
  @Exclude()
  PassengerServerName?: Promise<string | undefined>;
}
