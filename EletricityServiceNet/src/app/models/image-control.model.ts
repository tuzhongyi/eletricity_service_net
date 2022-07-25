import { DeviceStatus } from '../enums/device-status.enum';
import { Camera } from './camera.model';
import { ImageControlPolygon } from './image-control-polygon.model';
import { Polygon } from './polygon.model';

export class ImageControlModel<T = Camera> {
  constructor(
    id: string,
    stationId: string,
    name: string,
    src: string,
    onerror: string,
    status: DeviceStatus = DeviceStatus.offline,
    camera: T,
    eventTime?: Date,
    polygon?: ImageControlPolygon[]
  ) {
    this.id = id;
    this.stationId = stationId;
    this.name = name;
    this.src = src;
    this.onerror = onerror;
    this.status = status;
    this.camera = camera;
    if (eventTime) {
      this.eventTime = new Date(eventTime);
    }
    this.polygon = polygon;
  }
  eventTime?: Date;
  stationId: string;
  camera: T;
  name: string;
  src: string;
  id: string;
  onerror: string;
  status: DeviceStatus = DeviceStatus.offline;
  index = 0;
  polygon?: ImageControlPolygon[];
}

export class ImageControlModelArray {
  constructor(models: ImageControlModel[], index: number, autoplay = false) {
    this.models = models;
    this.index = index;
    this.autoplay = autoplay;
  }
  models: ImageControlModel[];
  autoplay: boolean;
  index: number;
}
