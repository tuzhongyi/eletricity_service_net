import { DeviceStatus } from 'src/app/enums/device-status.enum';
import { Position } from 'src/app/models/position.model';

export class MapChartPoint<T = any> implements IPoint<T> {
  constructor(
    id: string,
    name: string,
    url: string,
    position: Position,
    radius: number,
    status: DeviceStatus = DeviceStatus.online
  ) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.radius = radius;
    this.url = url;
    this.status = status;
  }
  id: string;
  position: Position;
  radius: number;
  name: string;
  status: DeviceStatus;
  url: string;
}

export interface IPoint<T = any> {
  id: string;
  name: string;
  position: Position;
  status?: DeviceStatus;
  data?: T;
}
