import { IPoint } from '../components/charts/map-chart/map-chart.model';
import { IConverter } from '../interfaces/converter.interface';
import { Camera } from '../models/camera.model';
import { Point } from '../models/point.model';
import { Resolution } from '../models/resolution.model';

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
      status: source.Status,
      data: source,
    };
  }
}

export class PercentPointConverter {
  to(source: Point, resolution: Resolution, fixed = 8): Point {
    return {
      X: parseFloat((source.X / resolution.Width).toFixed(fixed)),
      Y: parseFloat((source.Y / resolution.Height).toFixed(fixed)),
    };
  }
  from(source: Point, resolution: Resolution): Point {
    return {
      X: source.X * resolution.Width,
      Y: source.Y * resolution.Height,
    };
  }
}
