import { CameraZone } from 'src/app/models/zone.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';

export class BusinessHallCameraZoneRequestService {
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
