import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessHall } from 'src/app/models/business-hall.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { BusinessHallCameraRequestService } from './business-hall-camera-request.service';
import { BusinessHallEmployeeRequestService } from './business-hall-employee-request.service';
import { BusinessHallFloorRequestService } from './business-hall-floor-request.service';
import { BusinessHallHeatMapRequestService } from './business-hall-heat-map-request.service';
import { BusinessHallPassengerFlowRequestService } from './business-hall-passenger-flow-request.service';
import {
  GetBusinessHallsParams,
  SyncFaceSetParams,
} from './business-hall-request.params';
import { BusinessHallStatisticRequestService } from './business-hall-statistic-request.service';
import { BusinessHallStrangerRequestService } from './business-hall-stranger-request.service';

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
    return this.basic.howellPost(url);
  }

  syncFaceSet(hallId: string, deleteNotMatchItems: boolean): Promise<string>;
  syncFaceSet(hallId: string, params: SyncFaceSetParams): Promise<string>;
  syncFaceSet(hallId: string, args: SyncFaceSetParams | boolean) {
    let params: SyncFaceSetParams;
    if (typeof args === 'boolean') {
      params = new SyncFaceSetParams();
      params.DeleteNotMatchItems = args;
    } else {
      params = args;
    }
    let url = BusinessHallsUrl.syncFaceSets(hallId);
    return this.basic.howellPost<SyncFaceSetParams, string>(
      url,
      SyncFaceSetParams,
      params
    );
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

  private _employee?: BusinessHallEmployeeRequestService;
  public get employee(): BusinessHallEmployeeRequestService {
    if (!this._employee) {
      this._employee = new BusinessHallEmployeeRequestService(this.basic);
    }
    return this._employee;
  }

  private _stranger?: BusinessHallStrangerRequestService;
  public get stranger(): BusinessHallStrangerRequestService {
    if (!this._stranger) {
      this._stranger = new BusinessHallStrangerRequestService(this.basic);
    }
    return this._stranger;
  }
}
