import { Polygon } from '../models/polygon.model';
import { Resolution } from '../models/resolution.model';
import { PercentPointConverter } from './point.converter';

export class PercentPolygonConverter {
  point = new PercentPointConverter();
  to(polygon: Polygon, resolution: Resolution, fixed = 8): Polygon {
    let result = new Polygon();
    result.Points = polygon.Points.map((x) => {
      return this.point.to(x, resolution, fixed);
    });
    return result;
  }
  from(polygon: Polygon, resolution: Resolution): Polygon {
    let result = new Polygon();
    result.Points = polygon.Points.map((x) => {
      return this.point.from(x, resolution);
    });
    return result;
  }
}
