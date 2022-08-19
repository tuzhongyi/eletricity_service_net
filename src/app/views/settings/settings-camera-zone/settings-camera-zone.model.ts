import { Camera } from 'src/app/models/camera.model';
import { ImageResult } from 'src/app/models/image.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { CameraZone } from 'src/app/models/zone.model';

export class SettingsCameraZoneModel {
  cameraId: string = '';
  image!: ImageResult;
  camera!: Camera;
  zones: SelectItem[] = [];
  zone?: CameraZone;
}
