import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { firstValueFrom } from 'rxjs';
import { BusinessHallStatistic } from 'src/app/models/business-hall-statistic.model';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { Camera } from 'src/app/models/camera.model';
import { CurrentBusinessHallStatistic } from 'src/app/models/current-business-hall-statistic.model';
import { CurrentDayPassengerFlow } from 'src/app/models/current-day-passenger-flow.model';
import { Floor } from 'src/app/models/floor.model';
import { HeatMap } from 'src/app/models/heat-map.model';
import { PassengerFlow } from 'src/app/models/passenger-flow.model';
import { Plan } from 'src/app/models/plan.model';
import { CameraZone } from 'src/app/models/zone.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { Medium } from '../medium/medium';
import {
  GetBusinessHallsParams,
  GetBusinessHallStatisticsParams,
  GetCamerasParams,
  GetHeatMapParams,
  GetPassengerFlowsParams,
  GetZonesParams,
} from './business-hall-request.params';

@Injectable({
  providedIn: 'root',
})
export class BusinessHallRequestService {
  basic: BaseRequestService;
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

  list(params: GetBusinessHallsParams = new GetBusinessHallsParams()) {
    let url = BusinessHallsUrl.list();
    return this.type.paged(url, params);
  }

  syncCenterID(hallId: string) {
    let url = BusinessHallsUrl.sync(hallId);
    return this.basic.post(url);
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

  private _passenger?: BusinessHallPassengerFlowRequestService;
  public get passenger(): BusinessHallPassengerFlowRequestService {
    if (!this._passenger) {
      this._passenger = new BusinessHallPassengerFlowRequestService(this.basic);
    }
    return this._passenger;
  }

  private _heatMap?: BusinessHallHeatMapRequestService;
  public get heatMap(): BusinessHallHeatMapRequestService {
    if (!this._heatMap) {
      this._heatMap = new BusinessHallHeatMapRequestService(this.basic);
    }
    return this._heatMap;
  }

  private _statistic?: BusinessHallStatisticRequestService;
  public get statistic(): BusinessHallStatisticRequestService {
    if (!this._statistic) {
      this._statistic = new BusinessHallStatisticRequestService(this.basic);
    }
    return this._statistic;
  }
}
class BusinessHallStatisticRequestService {
  constructor(private basic: BaseRequestService) {}
  current(hallId: string) {
    let url = BusinessHallsUrl.statistic(hallId).current();
    return this.basic.get(url, CurrentBusinessHallStatistic);
  }
  list(params: GetBusinessHallStatisticsParams) {
    let url = BusinessHallsUrl.statistic().list();
    return this.basic.paged(url, BusinessHallStatistic, params);
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
    return this.type.put(url, model);
  }

  private _zone?: BusinessHallFloorZoneRequestService;
  public get zone(): BusinessHallFloorZoneRequestService {
    if (!this._zone) {
      this._zone = new BusinessHallFloorZoneRequestService(this.basic);
    }
    return this._zone;
  }

  private _plan?: BusinessHallFloorPlanRequestService;
  public get plan(): BusinessHallFloorPlanRequestService {
    if (!this._plan) {
      this._plan = new BusinessHallFloorPlanRequestService(this.basic);
    }
    return this._plan;
  }
}

class BusinessHallFloorPlanRequestService {
  constructor(private basic: BaseRequestService) {}

  async post(hallId: string, floorId: string, svg: string): Promise<Plan> {
    let code = encodeURIComponent(svg);
    let base64 = Base64.encode(code);
    let url = BusinessHallsUrl.floor(hallId).plan(floorId);
    return this.basic.base64(url, Plan, base64);
  }

  async get(id: string) {
    let url = Medium.data(id);
    let observable = this.basic.http.get(url, { responseType: 'text' });
    let result = await firstValueFrom(observable);
    return decodeURIComponent(result);
  }
}

class BusinessHallFloorZoneRequestService {
  constructor(basic: BaseRequestService) {
    this.type = basic.type(CameraZone);
  }
  type: BaseTypeRequestService<CameraZone>;

  array(hallId: string, floorId: string) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).basic();
    return this.type.array(url);
  }
  create(model: CameraZone) {
    let url = BusinessHallsUrl.floor(model.HallId).zone(model.FloorId).basic();
    return this.type.post(url, model);
  }
  get(hallId: string, floorId: string, zoneId: string) {
    let url = BusinessHallsUrl.floor(hallId).zone(floorId).item(zoneId);
    return this.type.get(url);
  }
  update(model: CameraZone) {
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
    return this.type.put(url, model);
  }

  list(params: GetCamerasParams = new GetCamerasParams()) {
    let url = BusinessHallsUrl.camera().list();
    return this.type.paged(url, params);
  }

  picture(
    hallId: string,
    cameraId: string,
    picture: string,
    base64: boolean = true
  ) {
    let url = BusinessHallsUrl.camera(hallId).picture(cameraId);
    if (base64) {
      let code = Base64.encode(picture);
      return this.type.base64(url, code);
    } else {
      return this.type.base64(url, picture);
    }
  }
  async capturePicture(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.camera(hallId).capturePicture(cameraId);
    await this.basic.post<string>(url);
    return url;
  }

  private _zone?: BusinessHallCameraZoneRequestService;
  public get zone(): BusinessHallCameraZoneRequestService {
    if (!this._zone) {
      this._zone = new BusinessHallCameraZoneRequestService(this.basic);
    }
    return this._zone;
  }
}
class BusinessHallCameraZoneRequestService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(CameraZone);
  }
  type: BaseTypeRequestService<CameraZone>;

  array(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.camera(hallId).zone(cameraId).basic();
    return this.type.array(url);
  }
  create(model: CameraZone) {
    let url = BusinessHallsUrl.camera(model.HallId)
      .zone(model.CameraId!)
      .basic();
    return this.type.post(url, model);
  }
  get(hallId: string, cameraId: string, zoneId: string) {
    let url = BusinessHallsUrl.camera(hallId).zone(cameraId).item(zoneId);
    return this.type.get(url);
  }
  update(model: CameraZone) {
    let url = BusinessHallsUrl.camera(model.HallId)
      .zone(model.CameraId!)
      .item(model.Id);
    return this.type.put(url, model);
  }
  remove(hallId: string, cameraId: string, zoneId: string) {
    let url = BusinessHallsUrl.camera(hallId).zone(cameraId).item(zoneId);
    return this.type.delete(url);
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
