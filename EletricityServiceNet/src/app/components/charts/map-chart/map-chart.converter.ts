import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Position } from 'src/app/models/position.model';
import { IPoint, MapChartPoint } from './map-chart.model';

export class MapChartPointConverter
  implements IConverter<IPoint, MapChartPoint>
{
  Convert(source: IPoint, ...res: any[]): MapChartPoint {
    return new MapChartPoint('assets/images/camera.png', source.position, 200);
  }
}
