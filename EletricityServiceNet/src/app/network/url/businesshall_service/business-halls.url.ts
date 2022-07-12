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
}

class BusinessHallsFloorsUrl implements InnerUrl {
  constructor(private base: string) {}

  basic(): string {
    return `${this.base}/Floors`;
  }

  item(floorId: string) {
    return `${this.basic()}/${floorId}`;
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
