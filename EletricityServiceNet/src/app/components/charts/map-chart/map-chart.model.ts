import { Position } from 'src/app/models/position.model';

export class MapChartPoint implements IPoint {
  constructor(id: string, url: string, position: Position, radius: number) {
    this.id = id;
    this.position = position;
    this.radius = radius;
    this.url = url;
  }
  id: string;
  position: Position;
  radius: number;
  url: string;
}

export interface IPoint {
  id: string;
  position: Position;
}
