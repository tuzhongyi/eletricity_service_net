import { Position } from 'src/app/models/position.model';

export class MapChartPoint implements IPoint {
  constructor(url: string, position: Position, radius: number) {
    this.position = position;
    this.radius = radius;
    this.url = url;
  }
  position: Position;
  radius: number;
  url: string;
}

export interface IPoint {
  position: Position;
}
