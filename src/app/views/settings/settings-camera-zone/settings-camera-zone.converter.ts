import {
  IConverter,
  IPromiseConverter,
} from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { Medium } from 'src/app/network/request/medium/medium';
import { MediumUrl } from 'src/app/network/url/medium/medium.url';
import { SettingsCameraZoneModel } from './settings-camera-zone.model';

export class SettingsCameraZoneConverter
  implements IPromiseConverter<Camera, SettingsCameraZoneModel>
{
  async Convert(
    source: Camera,
    getter: {
      zone: (source: Camera) => Promise<SelectItem[]>;
    }
  ): Promise<SettingsCameraZoneModel> {
    let model = new SettingsCameraZoneModel();
    model.camera = source;
    model.image = await Medium.img(source.ImageUrl);
    model.cameraId = source.Id;

    model.zones = await getter.zone(source);
    if (model.zones && model.zones.length > 0) {
      model.zone = model.zones[0].value;
    }

    return model;
  }
}
