import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { Camera } from 'src/app/models/camera.model';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { Floor } from 'src/app/models/floor.model';
import { HeatMap } from 'src/app/models/heat-map.model';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';
import { Zone } from 'src/app/models/zone.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import {
  GetBusinessHallsParams,
  GetCamerasParams,
  GetHeatMapParams,
  GetPassengerFlowsParams,
  GetZonesParams,
} from './business-hall-request.params';

@Injectable({
  providedIn: 'root',
})
export class BusinessHallRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<BusinessHall>;
  constructor(http: HttpClient) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(BusinessHall);
  }

  create(model: BusinessHall) {
    let url = BusinessHallsUrl.basic();
    return this.type.post(url, model);
  }

  get(id: string) {
    let url = BusinessHallsUrl.item(id);
    return this.type.get(url);
  }

  delete(id: string) {
    let url = BusinessHallsUrl.item(id);
    return this.type.delete(url);
  }
  update(model: BusinessHall) {
    let url = BusinessHallsUrl.item(model.Id);
    return this.type.put(url, model);
  }

  list(params: GetBusinessHallsParams) {
    let url = BusinessHallsUrl.list();
    return this.type.paged(url, params);
  }

  private _floor?: BusinessHallFloorRequestService;
  public get floor(): BusinessHallFloorRequestService {
    if (!this._floor) {
      this._floor = new BusinessHallFloorRequestService(this.basic);
    }
    return this._floor;
  }

  private _camera?: BusinessHallCameraRequestService;
  public get camera(): BusinessHallCameraRequestService {
    if (!this._camera) {
      this._camera = new BusinessHallCameraRequestService(this.basic);
    }
    return this._camera;
  }

  private _passengerFloor?: BusinessHallPassengerFlowRequestService;
  public get passengerFloor(): BusinessHallPassengerFlowRequestService {
    if (!this._passengerFloor) {
      this._passengerFloor = new BusinessHallPassengerFlowRequestService(
        this.basic
      );
    }
    return this._passengerFloor;
  }

  private _heatMap?: BusinessHallHeatMapRequestService;
  public get heatMap(): BusinessHallHeatMapRequestService {
    if (!this._heatMap) {
      this._heatMap = new BusinessHallHeatMapRequestService(this.basic);
    }
    return this._heatMap;
  }
}

class BusinessHallFloorRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(Floor);
  }
  type: BaseTypeRequestService<Floor>;

  array(hallId: string) {
    let url = BusinessHallsUrl.floor(hallId).basic();
    return this.type.array(url);
  }
  create(model: Floor) {
    let url = BusinessHallsUrl.floor(model.HallId).basic();
    return this.type.post(url, model);
  }
  get(hallId: string, floorId: string) {
    let url = BusinessHallsUrl.floor(hallId).item(floorId);
    return this.type.get(url);
  }
  delete(hallId: string, floorId: string) {
    let url = BusinessHallsUrl.floor(hallId).item(floorId);
    return this.type.delete(url);
  }
  update(model: Floor) {
    let url = BusinessHallsUrl.floor(model.HallId).item(model.Id);
    return this.type.delete(url);
  }

  private _zone?: BusinessHallFloorZoneRequestService;
  public get zone(): BusinessHallFloorZoneRequestService {
    if (!this._zone) {
      this._zone = new BusinessHallFloorZoneRequestService(this.basic);
    }
    return this._zone;
  }
}

class BusinessHallFloorZoneRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(Zone);
  }
  type: BaseTypeRequestService<Zone>;

  array(hallId: string, floorId: string) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).basic();
    return this.type.array(url);
  }
  create(model: Zone) {
    let url = BusinessHallsUrl.floor(model.HallId).zone(model.FloorId).basic();
    return this.type.post(url, model);
  }
  get(hallId: string, floorId: string, zoneId: string) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).item(zoneId);
    return this.type.get(url);
  }
  update(model: Zone) {
    let url = BusinessHallsUrl.floor(model.HallId)
      .zone(model.FloorId)
      .item(model.Id);
    return this.type.put(url, model);
  }
  delete(hallId: string, floorId: string, zoneId: string) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).item(zoneId);
    return this.type.delete(url);
  }
  list(hallId: string, floorId: string, params: GetZonesParams) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).list();
    return this.type.paged(url, params);
  }
}

class BusinessHallCameraRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(Camera);
  }
  type: BaseTypeRequestService<Camera>;

  array(hallId: string) {
    let url = BusinessHallsUrl.camera(hallId).basic();
    return this.type.array(url);
  }
  create(hallId: string, model: Camera) {
    let url = BusinessHallsUrl.camera(hallId).basic();
    return this.type.post(url, model);
  }
  get(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.camera(hallId).item(cameraId);
    return this.type.get(url);
  }
  delete(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.camera(hallId).item(cameraId);
    return this.type.delete(url);
  }
  update(hallId: string, model: Camera) {
    let url = BusinessHallsUrl.camera(hallId).item(model.Id);
    return this.type.delete(url);
  }

  list(params: GetCamerasParams = new GetCamerasParams()) {
    let url = BusinessHallsUrl.camera().list();
    return this.type.paged(url, params);
  }
}

class BusinessHallPassengerFlowRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(PassengerFlow);
  }
  type: BaseTypeRequestService<PassengerFlow>;

  current(hallId: string) {
    let url = BusinessHallsUrl.passengerFlow(hallId).current();
    return this.basic.get(url, CurrentDayPassengerFlow);
  }

  list(params: GetPassengerFlowsParams) {
    let url = BusinessHallsUrl.passengerFlow().list();
    return this.type.paged(url, params);
  }
}

class BusinessHallHeatMapRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(HeatMap);
  }
  type: BaseTypeRequestService<HeatMap>;
  list(params: GetHeatMapParams) {
    let url = BusinessHallsUrl.heatMap();
    return this.type.array(url, params);
  }
}
