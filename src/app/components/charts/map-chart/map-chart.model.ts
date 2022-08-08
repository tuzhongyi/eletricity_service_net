import { Position } from 'src/app/models/position.model';

export class MapChartPoint<T = any> implements IPoint<T> {
  constructor(
    id: string,
    name: string,
    url: string,
    position: Position,
    radius: number
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.radius = radius;
    this.url = url;
  }
  id: string;
  position: Position;
  radius: number;
  name: string;
  url: string;
}

export interface IPoint<T = any> {
  id: string;
  name: string;
  position: Position;
  data?: T;
}
