import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Duration } from 'src/app/models/duration.model';

export class RealtimeDeviceModel<T = any> {
  id: string = '';
  name: string = '';
  usage: CameraUsage = CameraUsage.monitor;
  status: DeviceStatus = DeviceStatus.offline;
  data?: T;
  duration?: Duration;
}
