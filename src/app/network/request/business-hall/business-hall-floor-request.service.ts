import { Floor } from 'src/app/models/floor.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { BusinessHallFloorPlanRequestService } from './business-hall-floor-plan-request.service';
import { BusinessHallFloorZoneRequestService } from './business-hall-floor-zone-request.service';

export class BusinessHallFloorRequestService {
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
