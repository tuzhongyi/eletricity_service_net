import { Base64 } from 'js-base64';
import { Camera } from 'src/app/models/camera.model';
import { BusinessHallsUrl } from '../../url/businesshall_service/business-halls.url';
import { BaseRequestService } from '../base-request.service';

export class BusinessHallCameraPictureRequestService {
  constructor(private basic: BaseRequestService) {}

  upload(
    hallId: string,
    cameraId: string,
    picture: string,
    base64: boolean = true
  ) {
    let url = BusinessHallsUrl.camera(hallId).picture(cameraId).basic();
    if (base64) {
      let code = Base64.encode(picture);
      return this.basic.base64(url, Camera, code);
    } else {
      return this.basic.base64(url, Camera, picture);
    }
  }
  async capture(hallId: string, cameraId: string) {
    let url = BusinessHallsUrl.camera(hallId).capturePicture(cameraId);
    await this.basic.howellPost<string>(url);
    return url;
  }

  get(hallId: string, cameraId: string, pictureId: string) {
    return BusinessHallsUrl.camera(hallId).picture(cameraId).item(pictureId);
  }
}
