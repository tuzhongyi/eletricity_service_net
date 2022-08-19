import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/interfaces/business.interface';
import { IConverter } from 'src/app/interfaces/converter.interface';
import { Camera } from 'src/app/models/camera.model';
import { Polygon } from 'src/app/models/polygon.model';
import { SelectItem } from 'src/app/models/select-item.model';
import { CameraZone } from 'src/app/models/zone.model';
import { BusinessHallRequestService } from 'src/app/network/request/business-hall/business-hall-request.service';
import { SettingsCameraZoneListConverter } from './settings-camera-zone-list.converter';

@Injectable()
export class SettingsCameraZoneListBusiness
  implements IBusiness<CameraZone[], SelectItem<CameraZone>[]>
{
  constructor(private service: BusinessHallRequestService) {}

  Converter: SettingsCameraZoneListConverter =
    new SettingsCameraZoneListConverter();
  loading?: EventEmitter<void> | undefined;
  async load(hallId: string, cameraId: string): Promise<SelectItem<any>[]> {
    let data = await this.getData(hallId, cameraId);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(hallId: string, cameraId: string): Promise<CameraZone[]> {
    return this.service.camera.zone.array(hallId, cameraId);
  }

  async create(camera: Camera, name: string, polygon: Polygon) {
    let zone = new CameraZone();
    zone.Area = polygon;
    zone.Name = name;
    zone.CameraId = camera.Id;
    zone.HallId = camera.HallId!;
    zone.FloorId = camera.FloorId!;
    zone.Id = Guid.NewGuid().ToString('N');
    let response = await this.service.camera.zone.create(zone);
    return this.load(response.HallId, response.CameraId!);
  }
  async remove(zone: CameraZone) {
    let response = await this.service.camera.zone.remove(
      zone.HallId,
      zone.CameraId!,
      zone.Id
    );
    return this.load(response.HallId, response.CameraId!);
  }
}
