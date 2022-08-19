import {
  businesshall_service_url,
  InnerUrl,
} from '../businesshall_service.url';

export class BusinessHallsUrl {
  static basic() {
    return `${businesshall_service_url}/BusinessHalls`;
  }

  static item(id: string) {
    return `${this.basic()}/${id}`;
  }
  static list() {
    return `${this.basic()}/List`;
  }
  static sync(hallId: string) {
    return `${this.item(hallId)}/SyncCenterID`;
  }

  static floor(hallId: string) {
    return new BusinessHallsFloorsUrl(this.item(hallId));
  }
  static camera(hallId?: string) {
    const base = hallId ? this.item(hallId) : this.basic();
    return new BusinessHallsCamerasUrl(base);
  }
  static heatMap() {
    return `${this.basic()}/HeatMaps`;
  }

  static passengerFlow(hallId?: string) {
    const base = hallId ? this.item(hallId) : this.basic();
    return new BusinessHallsPassengerFlowsUrl(base);
  }

  static statistic(hallId?: string) {
    const base = hallId ? this.item(hallId) : this.basic();
    return new BusinessHallsStatisticUrl(base);
  }
}
class BusinessHallsStatisticUrl implements InnerUrl {
  constructor(private base: string) {}

  basic(): string {
    return `${this.base}/Statistic`;
  }

  current(): string {
    return `${this.basic()}/Current`;
  }
  list(): string {
    return `${this.basic()}/List`;
  }
}
class BusinessHallsFloorsUrl implements InnerUrl {
  constructor(private base: string) {}

  basic(): string {
    return `${this.base}/Floors`;
  }

  item(floorId: string) {
    return `${this.basic()}/${floorId}`;
  }

  plan(floorId: string) {
    return `${this.item(floorId)}/Plan`;
  }

  zone(floorId: string) {
    return new BusinessHallsFloorsZonesUrl(this.item(floorId));
  }
}

class BusinessHallsFloorsZonesUrl implements InnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/Zones`;
  }
  item(zoneId: string) {
    return `${this.basic()}/${zoneId}`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}

class BusinessHallsCamerasUrl implements InnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/Cameras`;
  }

  item(cameraId: string) {
    return `${this.basic()}/${cameraId}`;
  }

  list() {
    return `${this.basic()}/List`;
  }

  picture(cameraId: string) {
    return `${this.item(cameraId)}/Picture`;
  }
  capturePicture(cameraId: string) {
    return `${this.item(cameraId)}/CapturePicture`;
  }

  zone(cameraId: string) {
    return new BusinessHallsCamerasZonesUrl(this.item(cameraId));
  }
}

class BusinessHallsCamerasZonesUrl implements InnerUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/Zones`;
  }
  item(zoneId: string) {
    return `${this.basic()}/${zoneId}`;
  }
}

class BusinessHallsPassengerFlowsUrl {
  constructor(private base: string) {}
  basic(): string {
    return `${this.base}/PassengerFlows`;
  }
  current() {
    return `${this.basic()}/Current`;
  }
  list() {
    return `${this.basic()}/List`;
  }
}
