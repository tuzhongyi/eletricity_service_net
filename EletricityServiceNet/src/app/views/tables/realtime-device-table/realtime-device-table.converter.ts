import { CameraUsage } from 'src/app/enums/camera-usage.enum';
import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { RealtimeDeviceModel } from './realtime-device-table.model';

export class RealtimeDeviceListTableConverter
  implements IConverter<Camera[], RealtimeDeviceModel<Camera>[]>
{
  private item = new RealtimeDeviceConverter();
  Convert(source: Camera[], ...res: any[]): RealtimeDeviceModel<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class RealtimeDeviceConverter
  implements IConverter<Camera, RealtimeDeviceModel<Camera>>
{
  Convert(source: Camera, ...res: any[]): RealtimeDeviceModel<Camera> {
    let model = new RealtimeDeviceModel<Camera>();
    model.id = source.Id;
    model.name = source.Name;
    model.status = source.Status ?? DeviceStatus.offline;
    model.usage = source.Usage ?? CameraUsage.monitor;
    model.data = source;
    return model;
  }
}
