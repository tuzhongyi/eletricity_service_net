import { Camera } from 'src/app/models/camera.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { BusinessHallCameraPictureRequestService } from './business-hall-camera-picture-request.service';
import { BusinessHallCameraZoneRequestService } from './business-hall-camera-zone-request.service';
import { GetCamerasParams } from './business-hall-request.params';

export class BusinessHallCameraRequestService {
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

  private _zone?: BusinessHallCameraZoneRequestService;
  public get zone(): BusinessHallCameraZoneRequestService {
    if (!this._zone) {
      this._zone = new BusinessHallCameraZoneRequestService(this.basic);
    }
    return this._zone;
  }

  private _picture?: BusinessHallCameraPictureRequestService;
  public get picture(): BusinessHallCameraPictureRequestService {
    if (!this._picture) {
      this._picture = new BusinessHallCameraPictureRequestService(this.basic);
    }
    return this._picture;
  }
}
