import { IPoint } from '../components/charts/map-chart/map-chart.model';
import { IConverter } from '../interfaces/converter.interface';
import { Camera } from '../models/camera.model';

export class CameraToPointArrayConverter
  implements IConverter<Camera[], IPoint<Camera>[]>
{
  Convert(source: Camera[], ...res: any[]): IPoint<Camera>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
  item = new CameraToPointConverter();
}

export class CameraToPointConverter
  implements IConverter<Camera, IPoint<Camera>>
{
  Convert(source: Camera, ...res: any[]): IPoint<Camera> {
    return {
      id: source.Id,
      name: source.Name,
      position: source.Position!,
      data: source,
    };
  }
}
