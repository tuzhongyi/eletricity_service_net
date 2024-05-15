import { CameraZone } from 'src/app/models/zone.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { GetZonesParams } from './business-hall-request.params';

export class BusinessHallFloorZoneRequestService {
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
