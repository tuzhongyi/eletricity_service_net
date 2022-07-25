import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';

export class RealtimeDeviceModel {
  id: string = '';
  name: string = '';
  usage: CameraUsage = CameraUsage.monitor;
  status: DeviceStatus = DeviceStatus.offline;
}
