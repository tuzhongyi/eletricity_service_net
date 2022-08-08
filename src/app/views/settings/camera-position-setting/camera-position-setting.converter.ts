import { IPoint } from 'src/app/components/charts/map-chart/map-chart.model';
import { CameraToPointConverter } from 'src/app/converters/point.converter';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';

export class CameraPositionSettingConverter
  implements IConverter<Camera[], IPoint<Camera>[]>
{
  item = new CameraToPointConverter();
  Convert(source: Camera[], ...res: any[]): IPoint<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}
